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
The application currently uses mock data for demonstration purposes. The transaction tracer simulates API calls with a delay to show the user experience.

## Technical Configuration
- **Development Server**: Runs on 0.0.0.0:5000 with HMR enabled
- **Host Configuration**: Configured to allow all hosts for Replit proxy compatibility
- **Deployment**: Autoscale deployment with build and preview commands

## Recent Changes (Oct 31, 2025)
- Created index.html for Vite in root directory
- Installed all npm dependencies
- Configured Vite server to bind to 0.0.0.0:5000 with allowedHosts enabled
- Set up frontend workflow on port 5000
- Configured deployment settings for production

## Backend Note
There's a Flask backend file (`app.py`) in the repository that provides basic Web3 functionality for checking balances, blocks, and transactions. This is currently not integrated with the React frontend but could be used for future backend API integration.
