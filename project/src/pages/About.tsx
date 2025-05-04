import React from 'react';
import { Shield, Users, Globe } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="space-y-12">
      <section className="text-center">
        <h1 className="text-4xl font-bold mb-6">About ChainTracer</h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto">
          ChainTracer is a powerful blockchain analytics tool designed to bring transparency
          and clarity to cryptocurrency transactions across multiple chains.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Our Mission</h3>
          <p className="text-gray-400">
            To provide accessible and powerful tools for blockchain analysis,
            enabling transparency and security in the cryptocurrency ecosystem.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Users className="h-12 w-12 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Our Team</h3>
          <p className="text-gray-400">
            A dedicated group of blockchain experts, developers, and security
            researchers working to make cryptocurrency transactions more transparent.
          </p>
        </div>

        <div className="bg-gray-800 p-6 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Globe className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Global Impact</h3>
          <p className="text-gray-400">
            Supporting organizations worldwide in tracking and analyzing
            cryptocurrency transactions for better security and compliance.
          </p>
        </div>
      </section>

      <section className="bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-6">Why Choose ChainTracer?</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2"></div>
            <p className="flex-1">
              <strong className="text-white">Cross-Chain Support:</strong>
              <span className="text-gray-400 ml-2">
                Track transactions across multiple blockchains with seamless integration.
              </span>
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2"></div>
            <p className="flex-1">
              <strong className="text-white">Advanced Analytics:</strong>
              <span className="text-gray-400 ml-2">
                Detailed transaction analysis with risk scoring and pattern detection.
              </span>
            </p>
          </div>
          <div className="flex items-start space-x-4">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2"></div>
            <p className="flex-1">
              <strong className="text-white">Real-Time Updates:</strong>
              <span className="text-gray-400 ml-2">
                Live transaction monitoring and instant notifications.
              </span>
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};