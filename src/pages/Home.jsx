import React from 'react';
import { Link } from 'react-router-dom';
import { Pill, FileText, Languages, ShieldCheck, Clock, Sparkles, Upload, CheckCircle2 } from 'lucide-react';

const featureItems = [
	{ icon: Pill, title: 'Prescription Clarity', desc: 'Readable dosage, frequency & duration breakdown for patients.' },
	{ icon: FileText, title: 'Report Insights', desc: 'Highlights abnormal values with plain-language guidance.' },
	{ icon: Languages, title: 'Multi-Language', desc: 'Support for major Indian languages with more coming soon.' },
	{ icon: ShieldCheck, title: 'Local & Private', desc: 'Your files summarized and stored locally in your browser history.' },
	{ icon: Clock, title: 'Fast Summaries', desc: 'Most documents summarized in a few seconds with helpful structure.' },
	{ icon: Sparkles, title: 'Smart Mock Mode', desc: 'Try demo summaries instantly—no file required.' },
];

const steps = [
	{ number: 1, title: 'Upload or Try Demo', text: 'Drop a prescription or lab report—or enable demo mode to explore.' },
	{ number: 2, title: 'Auto Processing', text: 'We extract key medical info & generate simplified language output.' },
	{ number: 3, title: 'Review & Save', text: 'Open the full result, copy important notes, revisit history anytime.' },
];

const Home = () => {
	return (
		<div className="space-y-20">
			{/* Hero */}
			<section className="relative overflow-hidden rounded-2xl gradient-brand text-white px-6 py-20 flex flex-col items-center text-center shadow-md animate-fade-slide">
				<div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_30%,#ffffff55,transparent_60%)]" />
				<div className="relative max-w-3xl mx-auto">
					<div className="inline-flex items-center gap-2 text-xs font-medium bg-white/10 backdrop-blur px-3 py-1 rounded-full mb-6 glass border-none">
						<span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Beta Preview
					</div>
					<h1 className="text-4xl sm:text-5xl font-bold leading-tight tracking-tight mb-4">Understand Your Medical Documents Easily</h1>
					<p className="text-base sm:text-lg text-white/90 mb-8">AI‑assisted summaries for prescriptions & health reports—clear, concise, and in your language. Empower patients & caregivers with faster comprehension.</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4">
						<Link to="/summarize" className="btn-primary px-6 py-3 text-base font-semibold shadow-sm">Start Summarizing</Link>
						<Link to="/help" className="btn-secondary px-6 py-3 text-base font-semibold">How it works</Link>
					</div>
					<p className="mt-6 text-xs text-white/70">⚠️ Not a substitute for professional medical advice. Always consult a doctor.</p>
				</div>
			</section>

			{/* Features Grid */}
			<section className="stagger-children">
				<div className="mb-10 text-center max-w-2xl mx-auto">
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">Why MediHelp?</h2>
					<p className="text-gray-600">Designed for patients, caregivers, and health support teams who need quick clarity without clinical jargon.</p>
				</div>
				<div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
					{featureItems.map(({ icon: Icon, title, desc }) => (
						<div key={title} className="group glass interactive-panel rounded-xl p-5 flex flex-col">
							<div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4 bg-brand-fade text-brand group-hover:bg-brand group-hover:text-white transition-colors">
								<Icon className="h-5 w-5" />
							</div>
							<h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base">{title}</h3>
							<p className="text-xs sm:text-sm text-gray-600 leading-relaxed flex-1">{desc}</p>
						</div>
					))}
				</div>
			</section>

			{/* How it Works */}
			<section className="stagger-children">
				<div className="mb-10 text-center max-w-2xl mx-auto">
					<h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">How It Works</h2>
					<p className="text-gray-600">Three quick steps from upload to understanding.</p>
				</div>
				<ol className="grid gap-6 md:grid-cols-3">
					{steps.map(s => (
						<li key={s.number} className="relative glass interactive-panel rounded-xl p-6 flex flex-col">
							<div className="absolute -top-4 left-4 h-8 w-8 rounded-full gradient-brand text-white flex items-center justify-center text-sm font-semibold shadow">{s.number}</div>
							<h3 className="font-semibold text-gray-900 mb-2 mt-2">{s.title}</h3>
							<p className="text-sm text-gray-600 leading-relaxed flex-1">{s.text}</p>
						</li>
					))}
				</ol>
			</section>

			{/* Trust / Disclaimer */}
			<section className="glass rounded-2xl p-8 interactive-panel">
				<div className="grid md:grid-cols-3 gap-8 items-start">
					<div className="md:col-span-2 space-y-6">
						<div>
							<h2 className="text-xl font-semibold mb-2 flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-brand" /> Privacy & Responsibility</h2>
							<p className="text-sm text-gray-600 leading-relaxed">Your summaries are stored locally in your browser history so you control them. This tool is designed to assist—not diagnose or prescribe. Always follow professional medical guidance.</p>
						</div>
						<div className="flex flex-wrap gap-3 text-xs">
							<span className="px-3 py-1 rounded-full bg-brand-fade text-brand flex items-center gap-1"><Upload className="h-3 w-3" /> Image / PDF Support</span>
							<span className="px-3 py-1 rounded-full bg-brand-fade text-brand flex items-center gap-1"><Languages className="h-3 w-3" /> Multi-Language</span>
							<span className="px-3 py-1 rounded-full bg-brand-fade text-brand flex items-center gap-1"><Sparkles className="h-3 w-3" /> AI Assisted</span>
							<span className="px-3 py-1 rounded-full bg-brand-fade text-brand flex items-center gap-1"><Clock className="h-3 w-3" /> Fast</span>
						</div>
					</div>
					<div className="space-y-4">
						<div className="gradient-brand text-white rounded-xl p-5 shadow interactive-panel flex flex-col gap-3">
							<h3 className="font-semibold text-sm">Quick Start</h3>
							<ul className="space-y-2 text-xs text-white/90">
								<li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300 mt-0.5" /> Open Summarize page</li>
								<li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300 mt-0.5" /> Upload or enable demo</li>
								<li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300 mt-0.5" /> Wait ~2 seconds</li>
								<li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300 mt-0.5" /> Expand the result</li>
								<li className="flex items-start gap-2"><CheckCircle2 className="h-4 w-4 text-emerald-300 mt-0.5" /> Review & consult doctor</li>
							</ul>
							<Link to="/summarize" className="btn-secondary bg-white text-brand hover:bg-brand-fade font-semibold text-xs justify-center">Try Now →</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="text-center py-12">
				<h2 className="text-2xl sm:text-3xl font-bold mb-3">Ready to Simplify Medical Text?</h2>
				<p className="text-gray-600 mb-6 text-sm sm:text-base">Get instant summaries that turn complexity into clarity.</p>
				<div className="flex flex-col sm:flex-row gap-4 justify-center">
					<Link to="/summarize" className="btn-primary px-6 py-3">Summarize a Document</Link>
					<Link to="/history" className="btn-secondary px-6 py-3">View Your History</Link>
				</div>
			</section>
		</div>
	);
};

export default Home;