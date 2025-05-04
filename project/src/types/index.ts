export interface Transaction {
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
  bridgeInfo?: {
    name: string;
    sourceChain: string;
    destinationChain: string;
    destinationTx?: string;
  };
}

export interface TransactionChain {
  id: string;
  inputAddress: string;
  startTime: string;
  endTime: string;
  finalRecipient: string;
  transactions: Transaction[];
}