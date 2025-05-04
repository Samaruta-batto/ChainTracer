import { TransactionChain } from '../types';

export const mockTransactionData: TransactionChain = {
  id: 'chain-123456',
  inputAddress: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
  startTime: '2025-04-12 08:23:15 UTC',
  endTime: '2025-04-12 12:45:32 UTC',
  finalRecipient: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
  transactions: [
    {
      id: 'tx-1',
      hash: '0x123f681646d4a755815f9cb19e1acc8565a0c2ac1655a0000a6v21ca967210b7',
      address: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      addressType: 'wallet',
      status: 'confirmed',
      amount: 5.23,
      currency: 'ETH',
      usdValue: 12567.89,
      timestamp: '2025-04-12 08:23:15 UTC',
      chain: 'ethereum',
      from: '0x742d35Cc6634C0532925a3b844Bc454e4438f44e',
      to: '0x977e0c32811f3213b73c9caa68ef4d7bd32e9639',
      riskScore: 12,
      metadata: [
        { key: 'Gas Limit', value: '21000' },
        { key: 'Gas Price', value: '30 Gwei' },
        { key: 'Nonce', value: '42' },
        { key: 'Block', value: '17284930' }
      ]
    },
    {
      id: 'tx-2',
      hash: '0x753aa1b153324bd82b1a0aca3e5c195fd4c22ffc568c8bc77ac0022b89f8fd2d',
      address: '0x977e0c32811f3213b73c9caa68ef4d7bd32e9639',
      addressType: 'contract',
      status: 'confirmed',
      amount: 5.23,
      currency: 'ETH',
      usdValue: 12567.89,
      timestamp: '2025-04-12 09:15:22 UTC',
      chain: 'ethereum',
      from: '0x977e0c32811f3213b73c9caa68ef4d7bd32e9639',
      to: '0x31edd5d03645ebe5e171ca21b8a13d787c18cc1c',
      riskScore: 15,
      metadata: [
        { key: 'Contract', value: 'Uniswap V3 Router' },
        { key: 'Method', value: 'swap(uint256,uint256,address)' },
        { key: 'Gas Used', value: '145,238' },
        { key: 'Block', value: '17284932' }
      ]
    },
    {
      id: 'tx-3',
      hash: '0x9c2e7f6482318545263e225753f79f66ff511af950f59f6aed9473c6f8262780',
      address: '0x31edd5d03645ebe5e171ca21b8a13d787c18cc1c',
      addressType: 'bridge',
      status: 'confirmed',
      amount: 5000,
      currency: 'USDC',
      usdValue: 5000,
      timestamp: '2025-04-12 10:22:45 UTC',
      chain: 'ethereum',
      from: '0x31edd5d03645ebe5e171ca21b8a13d787c18cc1c',
      to: '0x5a2910e22c1b707590a20ee218c58b78d5886e3b',
      riskScore: 25,
      metadata: [
        { key: 'Contract', value: 'Wormhole Bridge' },
        { key: 'Method', value: 'transferTokens(address,uint256,uint16)' },
        { key: 'Gas Used', value: '189,743' },
        { key: 'Block', value: '17284978' }
      ],
      bridgeInfo: {
        name: 'Wormhole',
        sourceChain: 'ethereum',
        destinationChain: 'polygon',
        destinationTx: '0x5e87b43fd81de3e0f6958e5c7c9bd2694179c2bd971e2a0761c3b33e14df22b3'
      }
    },
    {
      id: 'tx-4',
      hash: '0x5e87b43fd81de3e0f6958e5c7c9bd2694179c2bd971e2a0761c3b33e14df22b3',
      address: '0x2791bca1f2de4661ed88a30c99a7a9449aa84174',
      addressType: 'contract',
      status: 'confirmed',
      amount: 4975, // slight reduction due to bridge fees
      currency: 'USDC',
      usdValue: 4975,
      timestamp: '2025-04-12 10:45:12 UTC',
      chain: 'polygon',
      from: '0x5a2910e22c1b707590a20ee218c58b78d5886e3b',
      to: '0x8631a1a892af73cc4fc8c6f7d2ed9f497d2c8c66',
      riskScore: 30,
      metadata: [
        { key: 'Contract', value: 'Polygon USDC' },
        { key: 'Method', value: 'transfer(address,uint256)' },
        { key: 'Gas Used', value: '65,421' },
        { key: 'Block', value: '42156789' }
      ]
    },
    {
      id: 'tx-5',
      hash: '0x8d4f223d1498b159ac7188ad8600b8cd1a2cd96cc3d82f76744126d3122b0e29',
      address: '0x8631a1a892af73cc4fc8c6f7d2ed9f497d2c8c66',
      addressType: 'mixer',
      status: 'confirmed',
      amount: 4975,
      currency: 'USDC',
      usdValue: 4975,
      timestamp: '2025-04-12 11:15:33 UTC',
      chain: 'polygon',
      from: '0x8631a1a892af73cc4fc8c6f7d2ed9f497d2c8c66',
      to: '0x13374c8a9fe994893bd8323f2bb28ada787c802e',
      riskScore: 85,
      metadata: [
        { key: 'Contract', value: 'Tornado Cash Clone' },
        { key: 'Method', value: 'deposit(bytes32,address)' },
        { key: 'Gas Used', value: '220,142' },
        { key: 'Block', value: '42156902' }
      ]
    },
    {
      id: 'tx-6',
      hash: '0xc3f214da86764c48b947da249e06a2d78fae1ebd16c32e6233b28b6b56517b96',
      address: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
      addressType: 'final',
      status: 'confirmed',
      amount: 4950, // further reduction from mixer fees
      currency: 'USDC',
      usdValue: 4950,
      timestamp: '2025-04-12 12:45:32 UTC',
      chain: 'polygon',
      from: '0x13374c8a9fe994893bd8323f2bb28ada787c802e',
      to: '0x89205A3A3b2A69De6Dbf7f01ED13B2108B2c43e7',
      riskScore: 92,
      metadata: [
        { key: 'Contract', value: 'USDC Token' },
        { key: 'Method', value: 'transfer(address,uint256)' },
        { key: 'Gas Used', value: '52,811' },
        { key: 'Block', value: '42157104' }
      ]
    }
  ]
};