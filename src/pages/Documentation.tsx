import React from 'react';
import { Book, Code, Terminal, Lightbulb } from 'lucide-react';

export const Documentation: React.FC = () => {
  return (
    <div className="space-y-8">
      <section className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">Documentation</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          Learn how to use ChainTracer effectively with our comprehensive guides and documentation.
        </p>
      </section>

      <div className="grid md:grid-cols-2 gap-8">
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <Book className="mr-2 h-6 w-6 text-blue-500" />
            Getting Started
          </h2>
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-medium">Basic Usage</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-400">
              <li>Connect your wallet using MetaMask</li>
              <li>Enter a transaction hash or wallet address</li>
              <li>View the transaction flow visualization</li>
              <li>Analyze detailed transaction information</li>
            </ol>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <Terminal className="mr-2 h-6 w-6 text-purple-500" />
            Features
          </h2>
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-medium">Key Capabilities</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Cross-chain transaction tracking</li>
              <li>Bridge transfer detection</li>
              <li>Risk score analysis</li>
              <li>Transaction visualization</li>
            </ul>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <Code className="mr-2 h-6 w-6 text-green-500" />
            API Reference
          </h2>
          <div className="bg-gray-800 p-6 rounded-lg space-y-3">
            <p className="text-sm text-gray-300">REST Endpoints available on port 3000:</p>
            <pre className="text-xs text-gray-300 overflow-x-auto bg-gray-900 p-3 rounded font-mono">
{`// 1. Trace transaction or wallet
GET /api/trace/0x742d35Cc6634...

// 2. Fetch transaction details & risk score
GET /api/transaction/0x123f6816...

// 3. Check wallet balance in ETH
GET /api/balance/0x742d35Cc6634...

// 4. API & Web3 health status
GET /api/health`}
            </pre>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl font-semibold flex items-center">
            <Lightbulb className="mr-2 h-6 w-6 text-yellow-500" />
            Best Practices
          </h2>
          <div className="bg-gray-800 p-6 rounded-lg space-y-4">
            <h3 className="text-lg font-medium">Recommendations</h3>
            <ul className="list-disc list-inside space-y-2 text-gray-400">
              <li>Always verify transaction sources</li>
              <li>Monitor high-risk transactions</li>
              <li>Use filters for better analysis</li>
              <li>Export reports for record-keeping</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
};