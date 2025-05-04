import React, { useState } from 'react';
import { Search, Hash, Wallet } from 'lucide-react';

interface TransactionSearchProps {
  onSearch: (query: string) => void;
  isLoading: boolean;
}

export const TransactionSearch: React.FC<TransactionSearchProps> = ({ onSearch, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const [searchType, setSearchType] = useState<'tx' | 'wallet'>('tx');
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <div className="flex border border-gray-700 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 bg-gray-700 transition-all duration-200 flex-grow">
          <div className="flex items-center px-3 bg-gray-700 border-r border-gray-600">
            <button
              type="button"
              onClick={() => setSearchType('tx')}
              className={`p-1 rounded ${searchType === 'tx' ? 'text-blue-400' : 'text-gray-400'}`}
              title="Search by transaction hash"
            >
              <Hash className="h-5 w-5" />
            </button>
            <button
              type="button"
              onClick={() => setSearchType('wallet')}
              className={`p-1 rounded ml-2 ${searchType === 'wallet' ? 'text-blue-400' : 'text-gray-400'}`}
              title="Search by wallet address"
            >
              <Wallet className="h-5 w-5" />
            </button>
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            placeholder={searchType === 'tx' ? "Enter transaction hash..." : "Enter wallet address..."}
            className="flex-grow py-3 px-4 bg-gray-700 text-white placeholder-gray-400 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          className={`px-6 py-3 rounded-md font-medium flex items-center justify-center transition-colors ${
            isLoading || !inputValue.trim()
              ? 'bg-gray-600 text-gray-300 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 text-white'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing
            </span>
          ) : (
            <span className="flex items-center">
              <Search className="mr-2 h-4 w-4" />
              Trace
            </span>
          )}
        </button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setInputValue('0x742d35Cc6634C0532925a3b844Bc454e4438f44e')}
          className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-full transition-colors"
        >
          Example: Ethereum Address
        </button>
        <button
          type="button"
          onClick={() => setInputValue('0x123f681646d4a755815f9cb19e1acc8565a0c2ac1655a8f37a6v21ca967210b7')}
          className="text-xs bg-gray-700 hover:bg-gray-600 text-gray-300 px-3 py-1 rounded-full transition-colors"
        >
          Example: Transaction Hash
        </button>
      </div>
    </form>
  );
};