import React from 'react';
import { Link } from 'react-router-dom';

const Upload = () => {
	return (
		<div className="w-full max-w-xl mx-auto container-pad text-center space-y-5 animate-fade-slide">
			<h1 className="fluid-h2 font-bold tracking-tight gradient-text">📤 Upload Documents</h1>
			<p className="text-sm sm:text-base text-gray-600 leading-relaxed max-w-prose mx-auto">Use the Summarize page to upload your prescription or health report and generate an accessible summary. This page will later host direct drag & drop functionality.</p>
			<div>
				<Link to="/summarize" className="btn-primary inline-flex items-center gap-2 px-6 py-3 text-base">
					<span>✨</span> Go to Summarize
				</Link>
			</div>
		</div>
	);
};

export default Upload;
