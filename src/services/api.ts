const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export interface ApiTransaction {
  id: string;
  hash: string;
  address: string;
  addressType: 'wallet' | 'contract' | 'exchange' | 'bridge' | 'mixer' | 'final' | 'suspicious';
  status: 'confirmed' | 'pending' | 'failed';
  amount: number;
  currency: string;
  usdValue: number;
  timestamp: string;
  chain: string;
  from: string;
  to: string;
  riskScore: number;
  metadata: Array<{ key: string; value: string }>;
  transferEvents?: Array<{ from: string; to: string; token: string }>;
}

export interface ApiTransactionChain {
  id: string;
  inputAddress: string;
  startTime: string;
  endTime: string;
  finalRecipient: string;
  transactions: ApiTransaction[];
}

export const apiService = {
  async getTransaction(txHash: string): Promise<ApiTransaction> {
    const response = await fetch(`${API_BASE_URL}/transaction/${txHash}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch transaction');
    }
    return response.json();
  },

  async traceTransaction(addressOrTx: string): Promise<ApiTransactionChain> {
    const response = await fetch(`${API_BASE_URL}/trace/${addressOrTx}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to trace transaction');
    }
    return response.json();
  },

  async getBalance(address: string): Promise<{ address: string; balance: number; currency: string }> {
    const response = await fetch(`${API_BASE_URL}/balance/${address}`);
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Failed to fetch balance');
    }
    return response.json();
  },

  async health(): Promise<{ status: string; web3_connected: boolean; chain_id: number | null }> {
    const response = await fetch(`${API_BASE_URL}/health`);
    if (!response.ok) {
      throw new Error('Failed to check API health');
    }
    return response.json();
  }
};
