import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity } from 'lucide-react';
import { useWeb3 } from '../contexts/Web3Context';

export const Header: React.FC = () => {
  const { account, connectWallet, disconnectWallet, isConnected } = useWeb3();
  const location = useLocation();

  const formatAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <header className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-blue-500" />
            <Link to="/" className="text-xl font-bold text-white">ChainTracer</Link>
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link 
              to="/" 
              className={`text-gray-300 hover:text-white transition-colors ${location.pathname === '/' ? 'text-white' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/trace" 
              className={`text-gray-300 hover:text-white transition-colors ${location.pathname === '/trace' ? 'text-white' : ''}`}
            >
              Trace
            </Link>
            <Link 
              to="/about" 
              className={`text-gray-300 hover:text-white transition-colors ${location.pathname === '/about' ? 'text-white' : ''}`}
            >
              About
            </Link>
            <Link 
              to="/docs" 
              className={`text-gray-300 hover:text-white transition-colors ${location.pathname === '/docs' ? 'text-white' : ''}`}
            >
              Documentation
            </Link>
          </nav>
          <div>
            {isConnected ? (
              <button
                onClick={disconnectWallet}
                className="bg-gray-700 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors"
              >
                {formatAddress(account!)}
              </button>
            ) : (
              <button
                onClick={connectWallet}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
              >
                Connect Wallet
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};