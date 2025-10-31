import React, { useState } from 'react';
import { Search, Info, Download, Bookmark, AlertTriangle } from 'lucide-react';
import { TransactionSearch } from './TransactionSearch';
import { TransactionFlow } from './TransactionFlow';
import { TransactionDetails } from './TransactionDetails';
import { TransactionChain } from '../types';
import { apiService } from '../services/api';

export const TransactionTracer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionData, setTransactionData] = useState<TransactionChain | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    setIsLoading(true);
    setError(null);
    
    try {
      const data = await apiService.traceTransaction(query);
      setTransactionData(data);
      if (data.transactions.length > 0) {
        setActiveTransaction(data.transactions[0].id);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch transaction data');
      setTransactionData(null);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTransactionSelect = (id: string) => {
    setActiveTransaction(id);
  };
  
  const handleExportReport = () => {
    alert('Exporting transaction report...');
    // Implementation would go here
  };
  
  const handleBookmark = () => {
    alert('Transaction bookmarked!');
    // Implementation would go here
  };
  
  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Transaction Tracer</h2>
        <p className="text-gray-400 mb-6">
          Enter a transaction hash or wallet address to trace the flow of funds and identify the final recipient.
        </p>
        <TransactionSearch onSearch={handleSearch} isLoading={isLoading} />
      </div>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500 rounded-lg p-6 flex items-start space-x-3">
          <AlertTriangle className="h-6 w-6 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-500 font-semibold mb-1">Error</h3>
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      )}
      
      {transactionData && !isLoading && (
        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Transaction Flow</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={handleBookmark}
                  className="p-2 rounded-md hover:bg-gray-700 transition-colors"
                  title="Bookmark this transaction"
                >
                  <Bookmark className="h-5 w-5 text-gray-400" />
                </button>
                <button 
                  onClick={handleExportReport}
                  className="p-2 rounded-md hover:bg-gray-700 transition-colors"
                  title="Export transaction report"
                >
                  <Download className="h-5 w-5 text-gray-400" />
                </button>
                <button 
                  className="p-2 rounded-md hover:bg-gray-700 transition-colors"
                  title="View transaction information"
                >
                  <Info className="h-5 w-5 text-gray-400" />
                </button>
              </div>
            </div>
            <TransactionFlow 
              transactionChain={transactionData} 
              onTransactionSelect={handleTransactionSelect}
              activeTransaction={activeTransaction}
            />
          </div>
          
          {activeTransaction && (
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Transaction Details</h3>
              <TransactionDetails 
                transaction={transactionData.transactions.find(t => t.id === activeTransaction) || transactionData.transactions[0]} 
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};