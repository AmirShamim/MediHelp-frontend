import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const History = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem('medihelp_history') || '[]');
      setItems(data);
    } catch (e) {
      setItems([]);
    }
  }, []);

  const clearHistory = () => {
    localStorage.removeItem('medihelp_history');
    setItems([]);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">History</h2>
        {items.length > 0 && (
          <button onClick={clearHistory} className="btn-secondary">Clear</button>
        )}
      </div>
      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">No history yet. Summaries you generate will appear here.</p>
          <Link to="/summarize" className="btn-primary">Summarize a Document</Link>
        </div>
      ) : (
        <ul className="space-y-4">
          {items.map(item => (
            <li key={item.id} className="bg-white border rounded-lg p-4 shadow-sm hover:bg-gray-50">
              <Link to={`/result/${item.id}`} className="block">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
                    <h3 className="font-semibold">{item.fileName} <span className="text-xs text-gray-500">[{item.docType}]</span></h3>
                    <p className="text-gray-700 mt-2 whitespace-pre-line line-clamp-2">{typeof item.summary === 'string' ? item.summary : JSON.stringify(item.summary)}</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default History;