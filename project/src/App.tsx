import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Documentation } from './pages/Documentation';
import { TransactionTracer } from './components/TransactionTracer';
import { Web3Provider } from './contexts/Web3Context';

function App() {
  return (
    <Web3Provider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trace" element={<TransactionTracer />} />
            <Route path="/about" element={<About />} />
            <Route path="/docs" element={<Documentation />} />
          </Routes>
        </Layout>
      </Router>
    </Web3Provider>
  );
}

export default App;