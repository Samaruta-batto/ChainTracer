# ChainTracer

# 🔍 Cryptocurrency Transaction Tracing Tool

## 🚀 Overview

This project is a blockchain analytics tool developed for the **Narcotics Control Bureau (NCB)** to trace cryptocurrency transactions associated with drug trafficking and other illicit activities. The tool identifies the **end receiver** of crypto funds, providing actionable intelligence to law enforcement agencies.

> 🛡️ Developed by Team SEMPER INVICTA | Problem ID: 11 | PS Category: Software | Team ID: 46

---

## 🎯 Problem Statement

Cryptocurrencies are inherently **secure and anonymous**, making them ideal for unlawful purposes such as:

- Drug trafficking
- Human trafficking
- Weapons trade
- Online scams
- Terrorist financing

Illicit actors exploit the pseudonymous nature of blockchain to mask financial trails. Traditional tracking methods fail to keep up with the complexity and volume of transactions. Our tool aims to trace the **transaction chain** and identify the **final recipient**, forming the basis for further AI-based investigation in future iterations.

---

## 💡 Proposed Solution

The current version focuses on **transaction flow analysis** to detect and report the **end-chain wallet** of a given transaction path. Future versions will include:

- AI-driven pattern recognition
- Behavioral wallet analysis
- De-anonymization via OSINT and clustering

---

## 🧠 Features

- 🧾 Trace crypto transactions through wallets and contracts  
- 🔗 Identify the end recipient in a transaction chain  
- 📊 Visual representation of fund flow (future scope)  
- 🤖 AI anomaly detection (planned)  
- 🕵️‍♂️ User de-anonymization support (future integration)

---

## ⚙️ Tech Stack

- **Programming Language**: Python
- **Blockchain Interaction**: Web3.py, Etherscan API
- **Database**: SQL
- **Frontend (planned)**: React.js
- **AI Integration (planned)**: TensorFlow / PyTorch + OSINT Tools

---

## 📈 Architecture
```
User Input (Wallet/Txn Hash)
↓
Blockchain Scraper (via Web3/API)
↓
Transaction Flow Mapping Engine
↓
End Receiver Identification
↓
[Future Scope]
→ AI-based Pattern Detection
→ De-Anonymization & Scoring
```

---

## ✅ Current Capabilities

- Trace Ethereum-based transactions
- Detect the end receiver address in a transactional chain
- Basic risk flags for suspicious paths

---

## 🔍 Future Scope

- Cross-chain analysis (BTC, BNB, Monero)
- Mixer & tumbler detection logic
- Real-time monitoring dashboard
- Integration with law enforcement case systems

---

## ⚠️ Challenges

- Obfuscation via mixers and privacy coins
- Jurisdictional access to exchange KYC data
- Real-time scalability under large datasets

---

## 📚 References

- [Chainalysis Crypto Crime Report](https://www.chainalysis.com)
- [FATF Virtual Assets Guidance](https://www.fatf-gafi.org)
- [UNODC Global Drug Report](https://www.unodc.org)
- [MIT Darknet Cryptocurrency Research](https://www.media.mit.edu)

---

## 🤝 Contribution

We welcome contributions, especially on:

- Frontend visualization
- AI pattern detection modules
- OSINT integrations

---

## 📜 License

MIT License

---

## 👥 Team SEMPER INVICTA

- **Blockchain Lead** – Samartha Bhatt  
- **Backend Developers** –  Suryansh Sharan, Samartha Bhatt
- **Frontend** – Samartha Bhatt, Anshika Bharadwaj
- **Security & OSINT** – Sarist Pandey, Anshika Bharadwaj
- **UI/UX** –  Sharad Pandey, Anshika Bharadwaj, Suhani Sharma
- **Content & Research** – Samartha Bhatt, Suhani Sharma

---

> _“Cryptocurrency may hide identities, but our intelligence will reveal the truth.”_

