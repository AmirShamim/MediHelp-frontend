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
  <div className="w-full space-y-8" role="main">
      <div className="w-full flex flex-col gap-4 md:flex-row md:items-end md:justify-between animate-fade-slide">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2 gradient-text">📜 Your History</h2>
          <p className="text-sm sm:text-base text-gray-600">
            {items.length > 0 
              ? `${items.length} ${items.length === 1 ? 'summary' : 'summaries'} stored locally in your browser` 
              : 'No summaries yet. Start by uploading a document!'}
          </p>
        </div>
        {items.length > 0 && (
          <div className="flex gap-3 flex-shrink-0">
            <button 
              onClick={clearHistory} 
              className="btn-secondary flex items-center gap-2 px-4 py-2.5 whitespace-nowrap"
            >
              <Trash2 className="h-4 w-4 flex-shrink-0" /> 
              <span className="hidden sm:inline text-sm">Clear All</span>
              <span className="sm:hidden text-sm">Clear</span>
            </button>
          </div>
        )}
      </div>

      {items.length > 0 && (
        <div className="w-full glass rounded-2xl p-4 sm:p-5 interactive-panel animate-fade-slide shadow-lg">
          <div className="w-full flex flex-col gap-3 sm:gap-4">
            <div className="w-full flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1 min-w-0">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Search className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>
                <input 
                  value={query} 
                  onChange={e=>setQuery(e.target.value)} 
                  placeholder="Search..." 
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40 text-sm font-medium placeholder:text-gray-400 transition-all" 
                />
              </div>
              <div className="relative flex-1 sm:flex-initial sm:min-w-[200px]">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                  <Filter className="h-4 w-4 text-gray-400 flex-shrink-0" />
                </div>
                <select 
                  value={typeFilter} 
                  onChange={e=>setTypeFilter(e.target.value)} 
                  className="w-full pl-10 pr-3 py-2.5 rounded-lg border-2 border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand/40 focus:border-brand/40 text-sm font-medium appearance-none cursor-pointer transition-all"
                >
                  <option value="all">📋 All Types</option>
                  <option value="prescription">💊 Prescriptions</option>
                  <option value="healthReport">📊 Reports</option>
                </select>
              </div>
              <div className="bg-primary-100 px-4 py-2.5 rounded-lg text-center flex-shrink-0">
                <p className="text-sm font-bold text-primary-700">{filtered.length}</p>
                <p className="text-[10px] text-primary-600 uppercase">{filtered.length === 1 ? 'Result' : 'Results'}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {items.length === 0 ? (
  <div className="w-full text-center py-16 sm:py-20 glass rounded-2xl interactive-panel animate-fade-slide shadow-lg px-4">
          <div className="bg-gradient-to-br from-gray-100 to-primary-50 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner">
            <span className="text-5xl">📭</span>
          </div>
          <p className="text-gray-600 mb-8 text-base font-medium break-words px-4">No history yet</p>
          <p className="text-gray-500 mb-6 text-sm w-full max-w-md mx-auto px-4 break-words">Summaries you generate will appear here for quick access later.</p>
          <Link to="/summarize" className="btn-primary inline-flex items-center gap-2 whitespace-nowrap">
            <span>✨</span> Summarize a Document
          </Link>
        </div>
      ) : filtered.length === 0 ? (
  <div className="w-full text-center py-16 sm:py-20 glass rounded-2xl animate-fade-slide shadow-lg px-4">
          <div className="bg-gradient-to-br from-yellow-100 to-orange-50 w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center shadow-inner">
            <span className="text-5xl">🔍</span>
          </div>
          <p className="text-gray-600 text-base font-medium mb-3 break-words px-4">No matches found</p>
          <p className="text-gray-500 text-sm mb-6 px-4 break-words">Try adjusting your search or filter settings.</p>
          <button onClick={()=>{setQuery(''); setTypeFilter('all');}} className="btn-secondary text-sm inline-flex items-center gap-2 whitespace-nowrap">
            <span>↺</span> Reset Filters
          </button>
        </div>
      ) : (
        <div className="w-full grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 stagger-children" role="list">
          {filtered.map(item => {
            const snippet = summarizeString(item.summary);
            const typeEmoji = item.docType === 'healthReport' ? '📊' : '💊';
            const typeLabel = item.docType === 'healthReport' ? 'Health Report' : 'Prescription';
            return (
              <article key={item.id} role="listitem" className="w-full">
                <Link
                  to={`/result/${item.id}`}
                  aria-label={`Open summary for ${item.fileName}`}
                  className="block w-full glass rounded-xl p-4 sm:p-5 interactive-panel h-full group focus:outline-none focus:ring-2 focus:ring-brand/40 shadow-md hover:shadow-lg transition-all"
                >
                  <div className="w-full flex items-center justify-between mb-3 gap-2">
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center flex-shrink-0">
                        <span className="text-lg">{typeEmoji}</span>
                      </div>
                      <div className="text-[10px] font-semibold px-2.5 py-1 rounded-full bg-gradient-to-r from-brand/10 to-primary/10 text-brand border border-brand/20 whitespace-nowrap">
                        {typeLabel}
                      </div>
                    </div>
                    <span className="text-[9px] text-gray-400 font-medium bg-white/60 px-2 py-0.5 rounded whitespace-nowrap flex-shrink-0">
                      {new Date(item.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="w-full font-bold text-sm sm:text-base mb-2 truncate text-gray-800 group-hover:text-brand transition-colors" title={item.fileName}>
                    {item.fileName}
                  </h3>
                  <p className="w-full text-xs text-gray-600 leading-relaxed line-clamp-3 mb-3 font-medium">
                    {snippet}
                  </p>
                  <div className="w-full flex items-center justify-between pt-2.5 border-t border-gray-200/60 gap-2">
                    <span className="text-[9px] text-gray-400 uppercase tracking-wider font-bold whitespace-nowrap">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <span className="text-xs text-brand font-bold inline-flex items-center gap-1 opacity-70 group-hover:opacity-100 transition-all whitespace-nowrap">
                      View →
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