import React from 'react';
import './index.css';
import { Analytics } from '@vercel/analytics/react';
import { Routes, Route } from 'react-router-dom';

// Pages
import Home from './pages/Home';
import Summarize from './pages/Summarize';
import Upload from './pages/Upload';
import History from './pages/History';
import About from './pages/About';
import Help from './pages/Help';
import Result from './pages/Result';

// Layout
import Layout from './components/common/Layout';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Layout />}> 
          <Route path="/" element={<Home />} />
          <Route path="/summarize" element={<Summarize />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/history" element={<History />} />
          <Route path="/result/:id" element={<Result />} />
          <Route path="/about" element={<About />} />
          <Route path="/help" element={<Help />} />
          <Route path="*" element={<Home />} />
        </Route>
      </Routes>
      <Analytics />
    </>
  );
}

export default App;