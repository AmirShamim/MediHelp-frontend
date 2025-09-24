import React from 'react';
import { Link } from 'react-router-dom';

const Upload = () => {
	return (
		<div className="text-center">
			<h2 className="text-3xl font-bold mb-2">Upload</h2>
			<p className="text-gray-600 mb-6">Go to the summarize page to upload and process your document.</p>
			<Link to="/summarize" className="btn-primary">Go to Summarize</Link>
		</div>
	);
};

export default Upload;
