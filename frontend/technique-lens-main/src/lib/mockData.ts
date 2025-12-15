// Mock data for TECHNIQUERAG application
// This will be replaced with actual API calls later

export interface MitreTechnique {
  id: string;
  name: string;
  confidence: number;
  tacticId: string;
  tacticName: string;
  description: string;
}

export interface AnalysisResult {
  id: string;
  timestamp: string;
  inputText: string;
  techniques: MitreTechnique[];
  summary: string;
}

export const mockTechniques: MitreTechnique[] = [
  {
    id: "T1566.001",
    name: "Phishing: Spearphishing Attachment",
    confidence: 0.92,
    tacticId: "TA0001",
    tacticName: "Initial Access",
    description: "Adversaries may send spearphishing emails with a malicious attachment in an attempt to gain access to victim systems."
  },
  {
    id: "T1059.001",
    name: "Command and Scripting Interpreter: PowerShell",
    confidence: 0.87,
    tacticId: "TA0002",
    tacticName: "Execution",
    description: "Adversaries may abuse PowerShell commands and scripts for execution."
  },
  {
    id: "T1486",
    name: "Data Encrypted for Impact",
    confidence: 0.78,
    tacticId: "TA0040",
    tacticName: "Impact",
    description: "Adversaries may encrypt data on target systems or on large numbers of systems in a network to interrupt availability to system and network resources."
  }
];

export const generateMockAnalysis = (inputText: string): AnalysisResult => {
  return {
    id: `analysis-${Date.now()}`,
    timestamp: new Date().toISOString(),
    inputText: inputText.slice(0, 200) + (inputText.length > 200 ? "..." : ""),
    techniques: mockTechniques.map(t => ({
      ...t,
      confidence: Math.random() * 0.3 + 0.7 // Random confidence between 0.7-1.0
    })),
    summary: `Detected ${mockTechniques.length} MITRE ATT&CK techniques across multiple tactics including Initial Access, Execution, and Impact phases.`
  };
};

export const sampleCTIText = `APT29, also known as Cozy Bear, has been observed conducting a sophisticated spearphishing campaign targeting government agencies. The threat actor sent emails with malicious attachments designed to deploy a PowerShell-based backdoor. Once executed, the malware establishes persistence and begins exfiltrating sensitive documents. The campaign also includes ransomware deployment capabilities, encrypting critical files to disrupt operations and demand payment. The attackers leveraged compromised credentials to move laterally within the network, accessing multiple high-value targets.`;

export const mockStats = {
  totalAnalyses: 127,
  lastAnalysisDate: new Date().toISOString(),
  topTechniques: ["T1566.001", "T1059.001", "T1486"],
  averageConfidence: 0.84
};
