import React, { useState, useEffect } from 'react';
import { Info, Download, Bookmark, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { TransactionSearch } from './TransactionSearch';
import { TransactionFlow } from './TransactionFlow';
import { TransactionDetails } from './TransactionDetails';
import { TransactionChain } from '../types';
import { apiService } from '../services/api';
import { mockTransactionData } from '../data/mockData';

export const TransactionTracer: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [transactionData, setTransactionData] = useState<TransactionChain | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTransaction, setActiveTransaction] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (transactionData) {
      try {
        const stored = localStorage.getItem('chaintracer_bookmarks');
        const bookmarks: string[] = stored ? JSON.parse(stored) : [];
        setIsBookmarked(bookmarks.includes(transactionData.id));
      } catch {
        setIsBookmarked(false);
      }
    }
  }, [transactionData]);

  const showToast = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };
  
  const handleSearch = async (query: string) => {
    const trimmed = query.trim();
    setSearchQuery(trimmed);
    setIsLoading(true);
    setError(null);
    setShowInfo(false);
    
    try {
      const data = await apiService.traceTransaction(trimmed);
      setTransactionData(data);
      if (data.transactions && data.transactions.length > 0) {
        setActiveTransaction(data.transactions[0].id);
      }
    } catch (err) {
      setTransactionData(mockTransactionData);
      setActiveTransaction(mockTransactionData.transactions[0].id);
      setError(`Backend API unavailable (${err instanceof Error ? err.message : 'Connection failed'}). Displaying demonstration trace data.`);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleTransactionSelect = (id: string) => {
    setActiveTransaction(id);
  };
  
  const handleExportReport = () => {
    if (!transactionData) return;
    try {
      const jsonString = JSON.stringify(transactionData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `chaintracer-report-${transactionData.id}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Report exported successfully');
    } catch {
      showToast('Failed to export report');
    }
  };
  
  const handleBookmark = () => {
    if (!transactionData) return;
    try {
      const stored = localStorage.getItem('chaintracer_bookmarks');
      const bookmarks: string[] = stored ? JSON.parse(stored) : [];
      const id = transactionData.id;
      let updated: string[];
      if (bookmarks.includes(id)) {
        updated = bookmarks.filter(b => b !== id);
        setIsBookmarked(false);
        showToast('Bookmark removed');
      } else {
        updated = [...bookmarks, id];
        setIsBookmarked(true);
        showToast('Transaction chain bookmarked');
      }
      localStorage.setItem('chaintracer_bookmarks', JSON.stringify(updated));
    } catch {
      setIsBookmarked(!isBookmarked);
      showToast('Bookmark updated');
    }
  };
  
  return (
    <div className="space-y-6">
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-5 right-5 z-50 flex items-center space-x-2 bg-gray-800 border border-blue-500/50 text-white px-4 py-3 rounded-lg shadow-xl animate-fade-in">
          <CheckCircle2 className="h-5 w-5 text-blue-400" />
          <span className="text-sm">{notification}</span>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Transaction Tracer</h2>
        <p className="text-gray-400 mb-6">
          Enter a transaction hash or wallet address to trace the flow of funds and identify the final recipient.
        </p>
        <TransactionSearch onSearch={handleSearch} isLoading={isLoading} />
        {searchQuery && (
          <p className="text-xs text-gray-400 mt-3">
            Active query: <span className="font-mono text-blue-400">{searchQuery}</span>
          </p>
        )}
      </div>
      
      {error && (
        <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-4 flex items-start space-x-3">
          <AlertTriangle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-red-400 font-semibold text-sm mb-0.5">Notice</h3>
            <p className="text-red-200 text-sm">{error}</p>
          </div>
        </div>
      )}
      
      {isLoading && (
        <div className="flex flex-col justify-center items-center py-12 space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="text-gray-400 text-sm">Tracing on-chain transactions...</p>
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
                  className={`p-2 rounded-md transition-colors ${
                    isBookmarked ? 'bg-gray-700 text-yellow-400' : 'hover:bg-gray-700 text-gray-400 hover:text-white'
                  }`}
                  title={isBookmarked ? 'Remove bookmark' : 'Bookmark this transaction'}
                >
                  <Bookmark className={`h-5 w-5 ${isBookmarked ? 'fill-yellow-400' : ''}`} />
                </button>
                <button 
                  onClick={handleExportReport}
                  className="p-2 rounded-md hover:bg-gray-700 text-gray-400 hover:text-white transition-colors"
                  title="Export transaction report (JSON)"
                >
                  <Download className="h-5 w-5" />
                </button>
                <button 
                  onClick={() => setShowInfo(!showInfo)}
                  className={`p-2 rounded-md transition-colors ${
                    showInfo ? 'bg-gray-700 text-blue-400' : 'hover:bg-gray-700 text-gray-400 hover:text-white'
                  }`}
                  title="View trace overview information"
                >
                  <Info className="h-5 w-5" />
                </button>
              </div>
            </div>

            {showInfo && (
              <div className="mb-4 p-4 bg-gray-900/80 rounded-lg border border-gray-700 text-sm space-y-2">
                <h4 className="font-semibold text-blue-400">Trace Overview</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                  <div>
                    <span className="text-gray-400">Chain ID:</span>
                    <p className="font-mono text-gray-200">{transactionData.id}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Hops Identified:</span>
                    <p className="font-mono text-gray-200">{transactionData.transactions.length}</p>
                  </div>
                  <div>
                    <span className="text-gray-400">Final Recipient:</span>
                    <p className="font-mono text-gray-200 truncate">{transactionData.finalRecipient}</p>
                  </div>
                </div>
              </div>
            )}

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