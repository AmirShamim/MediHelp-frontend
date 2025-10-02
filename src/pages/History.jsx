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
    <div className="space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between animate-fade-slide">
        <div>
          <h2 className="text-4xl font-bold tracking-tight mb-2 gradient-text">📜 Your History</h2>
          <p className="text-base text-gray-600">
            {items.length > 0 
              ? `${items.length} ${items.length === 1 ? 'summary' : 'summaries'} stored locally in your browser` 
              : 'No summaries yet. Start by uploading a document!'}
          </p>
        </div>
        {items.length > 0 && (
          <div className="flex gap-3 flex-wrap">
            <button 
              onClick={clearHistory} 
              className="btn-secondary flex items-center gap-2 text-base px-5 py-3 hover:bg-red-50 hover:text-red-600 hover:border-red-300"
            >
              <Trash2 className="h-5 w-5" /> Clear All
            </button>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="glass rounded-2xl p-6 flex flex-col gap-5 interactive-panel animate-fade-slide shadow-lg">
          <div className="grid gap-5 md:grid-cols-[2fr_1.5fr_auto] items-center">
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input 
                value={query} 
                onChange={e=>setQuery(e.target.value)} 
                placeholder="Search filename or content..." 
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-white/60 bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40 backdrop-blur-sm text-sm font-medium placeholder:text-gray-400 transition-all" 
              />
            </div>
            <div className="relative">
              <div className="absolute left-4 top-1/2 -translate-y-1/2">
                <Filter className="h-5 w-5 text-gray-400" />
              </div>
              <select 
                value={typeFilter} 
                onChange={e=>setTypeFilter(e.target.value)} 
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-white/60 bg-white/80 focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40 backdrop-blur-sm text-sm font-medium appearance-none cursor-pointer transition-all"
              >
                <option value="all">📋 All Types</option>
                <option value="prescription">💊 Prescriptions</option>
                <option value="healthReport">📊 Health Reports</option>
              </select>
            </div>
            <div className="bg-primary-100 px-4 py-3 rounded-xl text-center">
              <p className="text-sm font-bold text-primary-700">{filtered.length}</p>
              <p className="text-xs text-primary-600">{filtered.length === 1 ? 'Result' : 'Results'}</p>
            </div>
          </div>
        </div>
      )}

      {items.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl interactive-panel animate-fade-slide shadow-lg">
          <div className="bg-gradient-to-br from-gray-100 to-primary-50 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner">
            <span className="text-5xl">📭</span>
          </div>
          <p className="text-gray-600 mb-8 text-base font-medium">No history yet</p>
          <p className="text-gray-500 mb-6 text-sm max-w-md mx-auto">Summaries you generate will appear here for quick access later.</p>
          <Link to="/summarize" className="btn-primary inline-flex items-center gap-2">
            <span>✨</span> Summarize a Document
          </Link>
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 glass rounded-2xl animate-fade-slide shadow-lg">
          <div className="bg-gradient-to-br from-yellow-100 to-orange-50 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner">
            <span className="text-5xl">🔍</span>
          </div>
          <p className="text-gray-600 text-base font-medium mb-3">No matches found</p>
          <p className="text-gray-500 text-sm mb-6">Try adjusting your search or filter settings.</p>
          <button onClick={()=>{setQuery(''); setTypeFilter('all');}} className="btn-secondary text-sm inline-flex items-center gap-2">
            <span>↺</span> Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3 stagger-children" role="list">
          {filtered.map(item => {
            const snippet = summarizeString(item.summary);
            const typeEmoji = item.docType === 'healthReport' ? '📊' : '💊';
            const typeLabel = item.docType === 'healthReport' ? 'Health Report' : 'Prescription';
            return (
              <article key={item.id} role="listitem" className="h-full">
                <Link
                  to={`/result/${item.id}`}
                  aria-label={`Open summary for ${item.fileName}`}
                  className="glass rounded-2xl p-6 interactive-panel flex flex-col h-full group focus:outline-none focus:ring-2 focus:ring-brand/40 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="flex items-start justify-between mb-4 gap-3">
                    <div className="flex items-center gap-2">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center shadow-sm">
                        <span className="text-xl">{typeEmoji}</span>
                      </div>
                      <div className="text-xs font-semibold px-3 py-1.5 rounded-full bg-gradient-to-r from-brand/10 to-primary/10 text-brand border border-brand/20">
                        {typeLabel}
                      </div>
                    </div>
                    <span className="text-[10px] text-gray-400 font-medium bg-white/60 px-2 py-1 rounded-md">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-base mb-2 truncate text-gray-800 group-hover:text-brand transition-colors" title={item.fileName}>
                    {item.fileName}
                  </h3>
                  <p className="text-xs text-gray-600 leading-relaxed line-clamp-4 flex-1 mb-4 font-medium">
                    {snippet}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-gray-200/60">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-bold">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-xs text-brand font-bold inline-flex items-center gap-1.5 opacity-70 group-hover:opacity-100 group-hover:gap-2 transition-all">
                      View <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                    </span>
                  </div>
                </Link>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default History;