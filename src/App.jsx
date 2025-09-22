import React from 'react';
import Home from './pages/Home';
import './index.css';

import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <>
      <Home />
      <Analytics />
    </>
  ) ;
}

export default App;