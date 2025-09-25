import React from 'react';
import SummaryCard from './SummaryCard';

/**
 * ResultsDisplay
 * Renders a responsive grid/list of summary preview cards.
 * Props:
 *  - items: array of { id, summary, docType, fileName, createdAt }
 *  - emptyMessage: string when no items
 *  - demo: boolean flag to display a small badge
 */
const ResultsDisplay = ({ items = [], emptyMessage = 'No results yet', demo = false }) => {
  if (!items || items.length === 0) {
    return (
      <div className="text-center text-sm text-gray-500 py-8 border rounded bg-white">
        {emptyMessage}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {items.map(item => (
        <div key={item.id} className="bg-white border rounded-lg p-4 shadow-sm">
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <h3 className="font-semibold text-gray-800 mr-auto truncate" title={item.fileName}>{item.fileName || 'Document'}</h3>
            <span className="text-xs px-2 py-0.5 rounded bg-gray-100 text-gray-600 capitalize">{item.docType}</span>
            {demo && <span className="text-[10px] px-2 py-0.5 rounded bg-blue-50 text-blue-600">Demo</span>}
            {item.createdAt && <span className="text-xs text-gray-400">{new Date(item.createdAt).toLocaleString()}</span>}
          </div>
          <SummaryCard summary={item.summary} docType={item.docType} />
        </div>
      ))}
    </div>
  );
};

export default ResultsDisplay;