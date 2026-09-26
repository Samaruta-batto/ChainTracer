import React, { createContext, useState, useEffect } from 'react';

export interface Web3ContextType {
  account: string | null;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
  isConnected: boolean;
}

export const Web3Context = createContext<Web3ContextType>({
  account: null,
  connectWallet: async () => {},
  disconnectWallet: () => {},
  isConnected: false,
});

export const Web3Provider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = (await window.ethereum.request({ method: 'eth_requestAccounts' })) as string[];
        setAccount(accounts[0] || null);
      } catch (error) {
        console.error('Error connecting to MetaMask:', error);
      }
    } else {
      window.open('https://metamask.io/download/', '_blank');
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
  };

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (...args: unknown[]) => {
        const accounts = args[0] as string[];
        setAccount(accounts?.[0] || null);
      });
    }
    return () => {
      if (window.ethereum?.removeListener) {
        window.ethereum.removeListener('accountsChanged', () => {});
      }
    };
  }, []);

  return (
    <Web3Context.Provider value={{
      account,
      connectWallet,
      disconnectWallet,
      isConnected: !!account,
    }}>
      {children}
    </Web3Context.Provider>
  );
};