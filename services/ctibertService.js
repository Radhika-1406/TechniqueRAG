const axios = require('axios');

const HF_API_URL = (process.env.HF_MODEL || 'ibm-research/CTI-BERT').startsWith('http')
  ? (process.env.HF_MODEL)
  : `https://api-inference.huggingface.co/models/${process.env.HF_MODEL || 'ibm-research/CTI-BERT'}`;

exports.callCtiBert = async (text) => {
  if (!process.env.HF_API_KEY) throw new Error('HF_API_KEY not set in .env');

  const payload = { inputs: text };
  const headers = {
    Authorization: `Bearer ${process.env.HF_API_KEY}`,
    'Content-Type': 'application/json',
  };

  const resp = await axios.post(HF_API_URL, payload, { headers, timeout: 120000 });
  return resp.data;
};
