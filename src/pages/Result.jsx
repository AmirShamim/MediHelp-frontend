import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import SummaryCard from '../components/results/SummaryCard';

const Result = () => {
	const { id } = useParams();
	const [item, setItem] = useState(null);

	useEffect(() => {
		const all = JSON.parse(localStorage.getItem('medihelp_history') || '[]');
		const found = all.find(x => String(x.id) === String(id));
		setItem(found || null);
	}, [id]);

  if (!item) {
    return (
      <div className="w-full max-w-xl mx-auto container-pad text-center space-y-5">
        <h1 className="fluid-h2 font-bold tracking-tight gradient-text">Result Not Found</h1>
        <p className="text-gray-600 text-sm sm:text-base">We couldn't locate this summary in your local history storage.</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/history" className="btn-secondary">Back to History</Link>
          <Link to="/summarize" className="btn-primary">Summarize New</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-5xl mx-auto container-pad space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <h1 className="fluid-h2 font-bold tracking-tight gradient-text mb-1">Summary Result</h1>
          <p className="text-gray-600 text-xs sm:text-sm font-medium">{new Date(item.createdAt).toLocaleString()} • {item.docType} • {item.language || 'en'}</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-2">
          <Link to="/history" className="btn-secondary">Back</Link>
          <Link to="/summarize" className="btn-primary">New Summary</Link>
        </div>
      </div>
      <SummaryCard summary={item.summary} docType={item.docType} />
    </div>
  );
};

export default Result;
