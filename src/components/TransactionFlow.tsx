import React, { useEffect, useRef } from 'react';
import { ArrowRight, Shuffle, AlertTriangle } from 'lucide-react';
import { TransactionChain, Transaction } from '../types';

interface TransactionFlowProps {
  transactionChain: TransactionChain;
  onTransactionSelect: (id: string) => void;
  activeTransaction: string | null;
}

export const TransactionFlow: React.FC<TransactionFlowProps> = ({ 
  transactionChain, 
  onTransactionSelect,
  activeTransaction
}) => {
  const flowContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Auto-select the first transaction when data loads
    if (transactionChain.transactions.length > 0 && !activeTransaction) {
      onTransactionSelect(transactionChain.transactions[0].id);
    }
  }, [transactionChain, activeTransaction, onTransactionSelect]);

  const getNodeColorClass = (type: string) => {
    switch (type) {
      case 'wallet':
        return 'bg-blue-500';
      case 'contract':
        return 'bg-purple-500';
      case 'exchange':
        return 'bg-yellow-500';
      case 'bridge':
        return 'bg-green-500';
      case 'mixer':
        return 'bg-red-500';
      case 'final':
        return 'bg-gradient-to-r from-blue-500 to-purple-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getNodeIconByType = (type: string) => {
    switch (type) {
      case 'mixer':
        return <Shuffle className="h-4 w-4" />;
      case 'suspicious':
        return <AlertTriangle className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const getChainColor = (chain: string) => {
    switch (chain) {
      case 'ethereum':
        return 'text-blue-400';
      case 'bsc':
        return 'text-yellow-400';
      case 'polygon':
        return 'text-purple-400';
      case 'solana':
        return 'text-green-400';
      case 'bitcoin':
        return 'text-orange-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div className="overflow-x-auto pb-4">
      <div ref={flowContainerRef} className="min-w-[768px]">
        <div className="flex flex-col space-y-6 py-4">
          {/* Chain visualization */}
          <div className="flex items-center space-x-2 mb-4">
            <ul className="flex items-center flex-wrap gap-4">
              {transactionChain.transactions.map((transaction, index) => (
                <li key={transaction.id} className="flex items-center">
                  {/* Transaction node */}
                  <button
                    onClick={() => onTransactionSelect(transaction.id)}
                    className={`group relative flex flex-col items-center ${
                      activeTransaction === transaction.id ? 'scale-110 z-10' : ''
                    } transition-all duration-300`}
                  >
                    <div className="flex flex-col items-center">
                      <div 
                        className={`
                          w-16 h-16 rounded-full flex items-center justify-center
                          ${getNodeColorClass(transaction.addressType)}
                          ${activeTransaction === transaction.id ? 'ring-2 ring-white' : ''}
                          shadow-lg hover:shadow-xl transition-all duration-300
                        `}
                      >
                        {getNodeIconByType(transaction.addressType) || (
                          <span className="text-xs font-mono text-white">
                            {transaction.address.substring(0, 4)}
                          </span>
                        )}
                      </div>
                      <div className={`text-xs mt-2 ${getChainColor(transaction.chain)}`}>
                        {transaction.chain}
                      </div>
                      <div className="text-xs text-gray-400 mt-1">
                        {transaction.addressType}
                      </div>
                    </div>
                    
                    {/* Hover tooltip */}
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 translate-y-full 
                                   opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 pointer-events-none">
                      <div className="bg-gray-900 text-white text-xs rounded p-2 shadow-lg border border-gray-700 w-48">
                        <p className="font-semibold truncate">{transaction.address}</p>
                        <p className="text-gray-400 mt-1">Amount: {transaction.amount} {transaction.currency}</p>
                      </div>
                    </div>
                  </button>
                  
                  {/* Connector arrow */}
                  {index < transactionChain.transactions.length - 1 && (
                    <div className="flex items-center mx-2">
                      <div className={`h-0.5 w-8 ${
                        transactionChain.transactions[index + 1].chain !== transaction.chain 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-500' 
                          : 'bg-gray-600'
                      }`}></div>
                      <ArrowRight className="h-4 w-4 text-gray-500" />
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </div>
          
          {/* Timeline indicators */}
          <div className="border-t border-gray-700 pt-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-400">Start time</p>
                <p className="font-medium">{transactionChain.startTime}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">End time</p>
                <p className="font-medium">{transactionChain.endTime}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};