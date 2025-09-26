import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Trash2 } from 'lucide-react';

const History = () => {
  const [items, setItems] = useState([]);
  const [query, setQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');

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

  const filtered = useMemo(() => {
    return items.filter(it => {
      const matchesType = typeFilter === 'all' || it.docType === typeFilter;
      const text = (it.fileName + ' ' + (typeof it.summary === 'string' ? it.summary : JSON.stringify(it.summary))).toLowerCase();
      const matchesQuery = !query || text.includes(query.toLowerCase());
      return matchesType && matchesQuery;
    });
  }, [items, query, typeFilter]);

  const summarizeString = (summary) => {
    if (!summary) return '';
    if (typeof summary === 'string') return summary;
    // Attempt to pull a helpful field order
    const possible = summary.summary || summary.instructions || summary.abnormalities || JSON.stringify(summary);
    return typeof possible === 'string' ? possible : JSON.stringify(possible);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between animate-fade-slide">
        <div>
          <h2 className="text-3xl font-bold tracking-tight mb-1">History</h2>
          <p className="text-sm text-gray-600">Your last {items.length} summaries are stored locally in this browser.</p>
        </div>
        {items.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            <button onClick={clearHistory} className="btn-secondary flex items-center gap-1 text-sm"><Trash2 className="h-4 w-4" /> Clear All</button>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="glass rounded-lg p-4 flex flex-col gap-4 interactive-panel animate-fade-slide">
          <div className="grid gap-4 md:grid-cols-3">
            <div className="relative">
              <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Search filename or text..." className="w-full pl-9 pr-3 py-2 rounded border border-white/60 bg-white/60 focus:outline-none focus:ring-2 focus:ring-brand/40 backdrop-blur-sm text-sm" />
            </div>
            <div className="flex gap-2 items-center">
              <Filter className="h-4 w-4 text-gray-400" />
              <select value={typeFilter} onChange={e=>setTypeFilter(e.target.value)} className="flex-1 rounded border border-white/60 bg-white/60 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand/40 backdrop-blur-sm">
                <option value="all">All Types</option>
                <option value="prescription">Prescription</option>
                <option value="healthReport">Health Report</option>
              </select>
            </div>
            <div className="text-xs text-gray-500 self-center">{filtered.length} match{filtered.length!==1 && 'es'}</div>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-16 glass rounded-2xl interactive-panel animate-fade-slide">
          <p className="text-gray-600 mb-6 text-sm">No history yet. Summaries you generate will appear here.</p>
          <Link to="/summarize" className="btn-primary">Summarize a Document</Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 glass rounded-2xl animate-fade-slide">
          <p className="text-gray-600 text-sm mb-2">No matches for your current filters.</p>
          <button onClick={()=>{setQuery(''); setTypeFilter('all');}} className="btn-secondary text-sm">Reset Filters</button>
        </div>
      ) : (
        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3 stagger-children">
          {filtered.map(item => {
            const snippet = summarizeString(item.summary);
            return (
              <Link key={item.id} to={`/result/${item.id}`} className="glass rounded-xl p-4 interactive-panel flex flex-col h-full group focus:outline-none focus:ring-2 focus:ring-brand/40">
                <div className="flex items-start justify-between mb-2 gap-3">
                  <div className="text-xs font-medium px-2 py-1 rounded-full bg-brand-fade text-brand capitalize tracking-wide">{item.docType === 'healthReport' ? 'Health Report' : 'Prescription'}</div>
                  <span className="text-[10px] text-gray-500">{new Date(item.createdAt).toLocaleString()}</span>
                </div>
                <h3 className="font-semibold text-sm mb-1 truncate" title={item.fileName}>{item.fileName}</h3>
                <p className="text-xs text-gray-600 leading-relaxed line-clamp-3 flex-1">{snippet}</p>
                <span className="mt-3 text-[11px] text-brand font-medium inline-flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">Open →</span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;