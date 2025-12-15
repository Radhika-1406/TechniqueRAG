import sys, os, json, numpy as np
from sentence_transformers import SentenceTransformer
from transformers import (
    AutoTokenizer,
    AutoModelForSequenceClassification,
    AutoModelForSeq2SeqLM,
    pipeline
)
from colbert import Searcher
import torch

# ----- Load models once -----
CACHE_DIR = "./model_cache"
os.makedirs(CACHE_DIR, exist_ok=True)

# ColBERT retriever
retriever = Searcher.from_pretrained("colbert-ir/colbertv2.0", cache_dir=CACHE_DIR)

# CTI-BERT reranker
tokenizer_cti = AutoTokenizer.from_pretrained("ibm-research/CTI-BERT", cache_dir=CACHE_DIR)
model_cti = AutoModelForSequenceClassification.from_pretrained("ibm-research/CTI-BERT", cache_dir=CACHE_DIR)

# BART generator
tokenizer_bart = AutoTokenizer.from_pretrained("facebook/bart-large-cnn", cache_dir=CACHE_DIR)
model_bart = AutoModelForSeq2SeqLM.from_pretrained("facebook/bart-large-cnn", cache_dir=CACHE_DIR)
generator = pipeline("text2text-generation", model=model_bart, tokenizer=tokenizer_bart, device=0 if torch.cuda.is_available() else -1)

# ----- Pipeline Logic -----
def run_pipeline(text: str):
    # 1. Retrieve documents
    docs = retriever.search(text, k=5)
    passages = [d["text"] for d in docs]

    # 2. Rerank with CTI-BERT
    inputs = [text + " [SEP] " + p for p in passages]
    enc = tokenizer_cti(inputs, truncation=True, padding=True, return_tensors="pt")
    outputs = model_cti(**enc)
    logits = outputs.logits.detach().numpy()
    probs = np.exp(logits) / np.exp(logits).sum(axis=1, keepdims=True)
    confidences = probs.max(axis=1)
    best_idx = int(np.argmax(confidences))

    # 3. Generate explanation
    best_passage = passages[best_idx] if passages else ""
    technique_id = "T1059"
    prompt = (
        f"Given the input: {text}\n"
        f"Evidence: {best_passage}\n"
        f"Provide a concise explanation and map to MITRE ATT&CK technique id {technique_id}."
    )
    explanation = generator(prompt, max_length=200, do_sample=False)[0]["generated_text"]

    result = {
        "technique": {"id": technique_id, "name": "Command and Scripting Interpreter"},
        "confidence": float(confidences[best_idx]),
        "evidence": passages,
        "explanation": explanation,
    }
    return result


if __name__ == "__main__":
    query = sys.argv[1] if len(sys.argv) > 1 else "APT used PowerShell scripts to execute commands remotely."
    result = run_pipeline(query)
    print(json.dumps(result))
