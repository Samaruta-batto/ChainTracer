import React from 'react';
import { ExternalLink, AlertCircle, Clock, Hash, DollarSign, ArrowRightLeft } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionDetailsProps {
  transaction: Transaction;
}

export const TransactionDetails: React.FC<TransactionDetailsProps> = ({ transaction }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-500';
      case 'pending':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatAddress = (address: string) => {
    return `${address.substring(0, 8)}...${address.substring(address.length - 8)}`;
  };

  return (
    <div className="space-y-6">
      {/* Status indicator */}
      <div className="flex items-center space-x-2">
        <div className={`w-3 h-3 rounded-full ${getStatusColor(transaction.status)}`}></div>
        <span className="capitalize">{transaction.status}</span>
        {transaction.riskScore > 70 && (
          <div className="ml-auto flex items-center text-red-400">
            <AlertCircle className="w-4 h-4 mr-1" />
            <span className="text-sm">High risk score: {transaction.riskScore}/100</span>
          </div>
        )}
      </div>

      {/* Transaction details cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center text-gray-400 mb-2">
            <Hash className="w-4 h-4 mr-2" />
            <h4 className="text-sm font-medium">Transaction Hash</h4>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-sm font-mono truncate mr-2">{formatAddress(transaction.hash)}</p>
            <a 
              href={`https://etherscan.io/tx/${transaction.hash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center text-gray-400 mb-2">
            <Clock className="w-4 h-4 mr-2" />
            <h4 className="text-sm font-medium">Timestamp</h4>
          </div>
          <p className="text-sm">{transaction.timestamp}</p>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center text-gray-400 mb-2">
            <DollarSign className="w-4 h-4 mr-2" />
            <h4 className="text-sm font-medium">Value</h4>
          </div>
          <div>
            <p className="font-medium">{transaction.amount} {transaction.currency}</p>
            <p className="text-sm text-gray-400">${transaction.usdValue}</p>
          </div>
        </div>

        <div className="bg-gray-700 rounded-lg p-4">
          <div className="flex items-center text-gray-400 mb-2">
            <ArrowRightLeft className="w-4 h-4 mr-2" />
            <h4 className="text-sm font-medium">From / To</h4>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-xs text-gray-400">From:</p>
              <p className="text-sm font-mono truncate">{formatAddress(transaction.from)}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">To:</p>
              <p className="text-sm font-mono truncate">{formatAddress(transaction.to)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction metadata */}
      <div className="bg-gray-700 rounded-lg p-4">
        <h4 className="font-medium mb-3">Transaction Metadata</h4>
        <div className="space-y-2">
          {transaction.metadata.map((item, index) => (
            <div key={index} className="flex justify-between text-sm">
              <span className="text-gray-400">{item.key}</span>
              <span>{item.value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bridge information (conditional) */}
      {transaction.addressType === 'bridge' && transaction.bridgeInfo && (
        <div className="bg-gray-700 rounded-lg p-4 border-l-4 border-green-500">
          <h4 className="font-medium mb-3">Cross-Chain Bridge Details</h4>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Bridge Name</span>
              <span>{transaction.bridgeInfo.name}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Source Chain</span>
              <span>{transaction.bridgeInfo.sourceChain}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Destination Chain</span>
              <span>{transaction.bridgeInfo.destinationChain}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-400">Destination Tx</span>
              <div className="flex items-center">
                <span className="font-mono truncate mr-2">{formatAddress(transaction.bridgeInfo.destinationTx || '')}</span>
                {transaction.bridgeInfo.destinationTx && (
                  <a 
                    href={`https://etherscan.io/tx/${transaction.bridgeInfo.destinationTx}`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:text-blue-300"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};