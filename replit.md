# ChainTracer - Replit Project Documentation

## Overview
ChainTracer is a cryptocurrency transaction tracing tool developed for the Narcotics Control Bureau (NCB) to trace cryptocurrency transactions associated with illicit activities. The application helps identify the end receiver of crypto funds, providing actionable intelligence to law enforcement agencies.

## Project Structure
This is a React + TypeScript + Vite frontend application with the following structure:
- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS
- **Web3 Integration**: @web3-react/core, @web3-react/metamask, ethers 6.11.1
- **Routing**: React Router DOM
- **Icons**: Lucide React

## Current Status
The project has been successfully configured for the Replit environment:
- ✅ Frontend running on port 5000
- ✅ Vite configured with host allowance for Replit proxy
- ✅ Deployment settings configured
- ✅ All dependencies installed

## Key Features
- 🧾 Trace crypto transactions through wallets and contracts
- 🔗 Identify the end recipient in a transaction chain
- 📊 Visual representation of fund flow
- 🤖 Risk analysis for suspicious transactions
- 🕵️‍♂️ Cross-chain tracking capabilities

## Development
The application now uses **real blockchain data** from Ethereum mainnet via Web3.py and Infura API. The backend API fetches actual transaction details, providing accurate information about transactions, gas fees, block numbers, and more.

## Technical Configuration
- **Frontend Server**: Runs on 0.0.0.0:5000 with HMR enabled
- **Backend API**: Flask REST API on localhost:3000
- **Host Configuration**: Frontend configured to allow all hosts for Replit proxy compatibility
- **Deployment**: Autoscale deployment with build and preview commands
- **Blockchain Connection**: Connected to Ethereum mainnet via Infura

## Architecture
- **Frontend**: React + TypeScript + Vite (Port 5000)
- **Backend**: Flask + Web3.py (Port 3000)
- **API Communication**: REST API with JSON responses
- **Data Source**: Ethereum blockchain via Infura RPC

## Recent Changes (Oct 31, 2025)
### Initial Setup
- Created index.html for Vite in root directory
- Installed all npm dependencies
- Configured Vite server to bind to 0.0.0.0:5000 with allowedHosts enabled
- Set up frontend workflow on port 5000
- Configured deployment settings for production

### Backend Integration
- Installed Python 3.11 with Flask, Web3.py, and Flask-CORS
- Rewrote app.py as a REST API backend with JSON endpoints
- Created API endpoints: `/api/transaction/<tx_hash>`, `/api/trace/<address_or_tx>`, `/api/balance/<address>`, `/api/health`
- Set up backend workflow on port 3000
- Created API service layer in frontend (`src/services/api.ts`)
- Updated TransactionTracer component to fetch real blockchain data
- Added error handling and loading states for API calls

## API Endpoints
- **GET /api/health** - Check API status and Web3 connection
- **GET /api/transaction/<tx_hash>** - Get detailed transaction information
- **GET /api/trace/<address_or_tx>** - Trace transaction chain (currently returns single transaction)
- **GET /api/balance/<address>** - Get ETH balance for an address
