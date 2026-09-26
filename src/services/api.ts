import { Transaction, TransactionChain } from '../types';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export type ApiTransaction = Transaction;
export type ApiTransactionChain = TransactionChain;

export const apiService = {
  async getTransaction(txHash: string): Promise<Transaction> {
    const response = await fetch(`${API_BASE_URL}/transaction/${encodeURIComponent(txHash)}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}: Failed to fetch transaction` }));
      throw new Error(errorData.error || 'Failed to fetch transaction');
    }
    return response.json();
  },

  async traceTransaction(addressOrTx: string): Promise<TransactionChain> {
    const response = await fetch(`${API_BASE_URL}/trace/${encodeURIComponent(addressOrTx)}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}: Failed to trace transaction` }));
      throw new Error(errorData.error || 'Failed to trace transaction');
    }
    return response.json();
  },

  async getBalance(address: string): Promise<{ address: string; balance: number; currency: string }> {
    const response = await fetch(`${API_BASE_URL}/balance/${encodeURIComponent(address)}`);
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: `HTTP ${response.status}: Failed to fetch balance` }));
      throw new Error(errorData.error || 'Failed to fetch balance');
    }
    return response.json();
  },

  async health(): Promise<{ status: string; web3_connected: boolean; chain_id: number | null }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to check API health`);
    }
    return response.json();
  }
};
