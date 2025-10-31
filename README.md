# 🔍 ChainTracer

**ChainTracer** is a production-grade blockchain forensics and cryptocurrency transaction tracing platform.  
It provides **real-time transaction analysis**, **automated risk assessment**, and **end-receiver identification** for law enforcement and security teams investigating illicit blockchain activities.

![Python](https://img.shields.io/badge/Python-3.8+-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-82.3%25-blue)
![Flask](https://img.shields.io/badge/Flask-2.0+-green)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Overview

Traditional financial tracking methods fail to address the complexity and anonymity of blockchain transactions used in illicit activities.  
**ChainTracer** eliminates this gap by leveraging **Web3.py integration with Ethereum mainnet** for real-time transaction analysis, **automated risk scoring algorithms**, and **forensic-grade event parsing** to trace cryptocurrency flows across complex wallet chains.

> 🛡️ **Developed for:** India's Narcotics Control Bureau (NCB) | **Problem ID:** 11 | **Team:** SEMPER INVICTA

---

## ✨ Key Features

### ✅ Currently Implemented

- 🔗 **Real-time Blockchain Integration:** Direct Ethereum mainnet access via Web3.py and Infura API
- 🎯 **Automated Risk Assessment:** Multi-factor scoring algorithm (0–100 scale) analyzing transaction patterns
- 🧠 **Smart Contract Detection:** Bytecode analysis to distinguish contracts from regular wallets
- 💰 **ERC-20 Token Tracking:** Event log parsing to trace token transfers using keccak signatures
- 📊 **Transaction Chain Tracing:** Identify end receivers through multi-hop wallet analysis
- 🛡️ **Forensic Metadata Extraction:** Gas analysis, nonce tracking, block confirmation, timestamp correlation
- 🌐 **RESTful API:** 4 production endpoints with CORS support and comprehensive error handling
- ⚡ **TypeScript Frontend:** Modern React architecture with type-safe data models

### 🔮 Planned Enhancements

- 🔄 **Interactive Transaction Graphs:** D3.js/React Flow visualization of fund flows
- 🔄 **Multi-Chain Support:** Bitcoin, Polygon, BSC, and cross-chain tracking
- 🔄 **AI Pattern Recognition:** ML-based anomaly detection for suspicious behavior
- 🔄 **Mixer/Tumbler Detection:** Identify privacy tool usage in transaction chains
- 🔄 **OSINT Integration:** Correlate on-chain data with threat intelligence sources
- 🔄 **Database Persistence:** PostgreSQL caching for repeat queries

---

## 🧭 Tech Stack

| Layer | Technologies |
|-------|---------------|
| **Backend** | Python 3.8+, Flask 2.0+, Web3.py, Flask-CORS |
| **Frontend** | TypeScript, React 18, Vite, Tailwind CSS, ESLint |
| **Blockchain** | Ethereum Mainnet, Infura API, Etherscan API |
| **Security** | Environment variables, Input validation, CORS policies |
| **Data Processing** | JSON serialization, Event log parsing, Gas analysis |

---

## 🏗️ System Architecture

```text
┌─────────────────────────────────┐
│ React Frontend                  │
│ (TypeScript + Tailwind CSS)     │
│ Port 5173                       │
└───────────┬─────────────────────┘
            │ HTTP/REST API Calls
            ▼
┌─────────────────────────────────┐
│ Flask Backend                   │
│ (Python + Web3.py)              │
│ Port 3000                       │
└───────────┬─────────────────────┘
            │ Web3 Provider
            ▼
┌─────────────────────────────────┐
│ Infura Gateway                  │
│ (Ethereum Node Access)          │
└───────────┬─────────────────────┘
            │ JSON-RPC
            ▼
┌─────────────────────────────────┐
│ Ethereum Blockchain             │
│ (Mainnet - Live Data)           │
└─────────────────────────────────┘
```

### 🧮 Risk Scoring Algorithm

| Criteria | Points |
|-----------|---------|
| Contract Interaction | +15 |
| Transaction > 100 ETH | +20 |
| Transaction > 10 ETH | +10 |
| Failed Transaction | +30 |
| **Maximum Score** | **100** |

---

## 📁 Project Structure

```text
ChainTracer/
├── src/                     # TypeScript/React frontend
│   ├── components/          # UI components
│   ├── contexts/            # State management
│   ├── services/            # API calls
│   ├── pages/               # UI pages
│   ├── types/               # TypeScript interfaces
│   ├── App.tsx              # Root component
│   └── main.tsx             # Entry point
├── app.py                   # Flask backend entry
├── templates/               # HTML templates
├── .env                     # Environment variables
├── package.json             # Node dependencies
├── pyproject.toml           # Python dependencies
├── tailwind.config.js       # Tailwind config
└── README.md                # This file
```

---

## ⚙️ Setup Instructions

### Prerequisites
- Python 3.8+
- Node.js 16+
- npm or yarn
- Infura API key ([Get one here](https://infura.io/))

### Installation

**Clone Repository**
```bash
git clone https://github.com/Samaruta-batto/ChainTracer.git
cd ChainTracer
```

**Setup Backend**
```bash
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate
pip install flask flask-cors web3 python-dotenv
```

**Environment Variables**
```bash
INFURA_API_KEY=your_infura_api_key
PORT=3000
```

**Run Backend**
```bash
python app.py
```

**Setup Frontend**
```bash
npm install
npm run dev
```

---

## 🔌 API Endpoints

| Endpoint | Description |
|-----------|--------------|
| **GET /api/health** | Returns Web3 connection and chain ID |
| **GET /api/transaction/<tx_hash>** | Fetch transaction details with risk score |
| **GET /api/trace/<address_or_tx_hash>** | Trace complete transaction flow |
| **GET /api/balance/<address>** | Fetch wallet balance in ETH |

---

## 👥 Development Team

| Developer | GitHub | Role | Contributions |
|-----------|--------|------|---------------|
| **Samartha Bhatt** | [@Samaruta-batto](https://github.com/Samaruta-batto) | Lead Developer | Flask backend, Web3 integration, risk algorithms, smart contract detection, frontend structure |
| **theOMEN203** | [@theOMEN203](https://github.com/theOMEN203) | Co-Developer | Frontend UI, testing, HTML templates |

> 🧠 Originally developed for **India’s Narcotics Control Bureau (NCB)** as Team SEMPER INVICTA (Problem ID: 11).

---

## 🧩 Future Roadmap

- [ ] D3.js transaction visualization
- [ ] Multi-chain support (Bitcoin, Polygon, BSC)
- [ ] AI/ML anomaly detection
- [ ] Mixer/tumbler tracking
- [ ] PostgreSQL data caching
- [ ] API key authentication
- [ ] WebSocket live monitoring

---

## 🔒 Security

✅ Environment variables for secrets  
✅ Input validation for hashes/addresses  
✅ CORS policy enforcement  
✅ Graceful error handling  
🔄 Planned: JWT auth, rate limiting, HTTPS, request logging

---

## ⚠️ Challenges & Solutions

| Challenge | Solution |
|-----------|-----------|
| Accurate blockchain data | Web3.py direct Infura mainnet access |
| Smart contract detection | Bytecode analysis via `eth.get_code()` |
| Balanced risk scoring | Weighted algorithm tuning |
| ERC-20 tracking | Keccak signature parsing |


---


> **"Transparency through immutability. Justice through traceability."** 🔍
