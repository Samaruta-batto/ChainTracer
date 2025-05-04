import React from 'react';
import { ArrowRight, Shield, Search, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Home: React.FC = () => {
  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
          Track Cryptocurrency Transactions Across Chains
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          ChainTracer helps you trace and analyze cryptocurrency transactions across multiple blockchains, providing detailed insights and visualization of fund flows.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/trace"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center transition-colors"
          >
            Start Tracing <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
          <Link
            to="/docs"
            className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Learn More
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="bg-blue-500/10 p-3 rounded-lg w-fit mb-4">
            <Search className="h-6 w-6 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Cross-Chain Tracking</h3>
          <p className="text-gray-400">
            Follow transactions across multiple blockchains with support for popular bridge protocols.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="bg-purple-500/10 p-3 rounded-lg w-fit mb-4">
            <Shield className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Risk Analysis</h3>
          <p className="text-gray-400">
            Identify suspicious patterns and assess transaction risk scores in real-time.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg">
          <div className="bg-green-500/10 p-3 rounded-lg w-fit mb-4">
            <Zap className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-2">Real-Time Updates</h3>
          <p className="text-gray-400">
            Get instant notifications and live updates for tracked transactions.
          </p>
        </div>
      </section>
    </div>
  );
};