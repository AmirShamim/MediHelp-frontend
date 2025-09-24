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
			<div className="text-center">
				<h2 className="text-2xl font-semibold mb-2">Result not found</h2>
				<p className="text-gray-600 mb-4">We couldn't find this summary in your local history.</p>
				<div className="space-x-2">
					<Link to="/history" className="btn-secondary">Back to History</Link>
					<Link to="/summarize" className="btn-primary">Summarize New</Link>
				</div>
			</div>
		);
	}

	return (
		<div>
			<div className="flex items-center justify-between mb-6">
				<div>
					<h2 className="text-2xl font-bold">Summary Result</h2>
					<p className="text-gray-600 text-sm">{new Date(item.createdAt).toLocaleString()} • {item.docType} • {item.language}</p>
				</div>
				<div className="space-x-2">
					<Link to="/history" className="btn-secondary">Back</Link>
					<Link to="/summarize" className="btn-primary">New Summary</Link>
				</div>
			</div>
			<SummaryCard summary={item.summary} docType={item.docType} />
		</div>
	);
};

export default Result;
