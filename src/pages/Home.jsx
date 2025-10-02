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
		<div className="w-full space-y-24">
			{/* Hero */}
			<section className="relative isolate overflow-hidden rounded-3xl bg-white/60 backdrop-blur-sm border border-gray-200 px-5 sm:px-10 hero text-center shadow-[0_4px_30px_-10px_rgba(0,0,0,0.1)]">
				{/* subtle gradient accent bar */}
				<div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-primary-500 via-primary-300 to-primary-600" />
				<div className="w-full max-w-5xl mx-auto px-2">
					<div className="inline-flex items-center gap-2 text-xs font-medium bg-gradient-to-r from-primary-100 to-primary-50 text-primary-700 px-3 py-1.5 rounded-full mb-10 border border-primary-300/60 shadow-sm">
						<span className="relative flex items-center justify-center">
							<span className="h-2 w-2 rounded-full bg-emerald-500" />
						</span>
						<span className="tracking-wide">Beta Preview</span>
					</div>
					<h1 className="fluid-h1 tracking-tight mb-8 text-gray-900">
						Understand Your Medical Documents <span className="bg-gradient-to-r from-primary-700 to-primary-500 bg-clip-text text-transparent">Easily</span>
					</h1>
					<p className="text-base sm:text-lg text-gray-600 mb-10 w-full max-w-2xl mx-auto leading-relaxed px-2">
						AI‑powered summaries that convert prescriptions & lab reports into plain language. Faster clarity for patients and caregivers—right in your browser.
					</p>
					<div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 stack-xs">
						<Link to="/summarize" className="btn-primary px-9 py-4 text-base sm:text-lg font-semibold">
							Start Summarizing →
						</Link>
						<Link to="/help" className="btn-secondary px-9 py-4 text-base sm:text-lg font-semibold">
							How it works
						</Link>
					</div>
					<p className="mt-10 text-xs sm:text-sm text-gray-500 w-full max-w-md mx-auto px-4">
						⚠️ Not medical advice. Always consult a licensed professional.
					</p>
				</div>
			</section>

			{/* Features Grid */}
			<section className="w-full section-tight">
				<div className="mb-10 text-center w-full max-w-3xl mx-auto px-2">
					<h2 className="fluid-h2 font-bold tracking-tight mb-4 gradient-text">Why Choose MediHelp?</h2>
					<p className="text-gray-600 text-base sm:text-lg leading-relaxed">Designed for patients, caregivers, and health support teams who need quick clarity without clinical jargon.</p>
				</div>
				<div className="grid-features">
					{featureItems.map(({ icon: Icon, title, desc }) => (
						<article key={title} className="feature-card group flex flex-col select-none" aria-labelledby={`feat-${title.replace(/\s+/g,'-')}`}> 
							<div className="feature-icon mb-6" aria-hidden="true">
								<Icon className="h-6 w-6" />
							</div>
							<h3 id={`feat-${title.replace(/\s+/g,'-')}`} className="font-bold text-base text-gray-900 mb-2 tracking-tight">{title}</h3>
							<p className="text-gray-600 text-[13px] leading-relaxed flex-1">{desc}</p>
							<span className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-semibold text-brand/70 group-hover:text-brand transition-colors" aria-hidden="true">
								<span className="translate-x-0 group-hover:translate-x-0.5 transition-transform">Learn more</span>
								<span className="opacity-0 group-hover:opacity-100 transition-opacity">→</span>
							</span>
						</article>
					))}
				</div>
			</section>

			{/* How it Works */}
			<section className="w-full section-tight">
				<div className="mb-10 text-center w-full max-w-3xl mx-auto px-2">
					<h2 className="fluid-h2 font-bold tracking-tight mb-4 text-gray-900">How It Works</h2>
					<p className="text-gray-600 text-base sm:text-lg leading-relaxed">Three simple steps from document to understanding.</p>
				</div>
				<ol className="grid gap-6 md:grid-cols-3">
					{steps.map(s => (
						<li key={s.number} className="rounded-xl border border-gray-200 bg-white p-6 flex flex-col group transition-colors hover:border-gray-300 hover:bg-gray-50">
							<div className="flex items-center gap-3 mb-4">
								<div className="h-10 w-10 rounded-lg bg-gray-100 text-gray-800 flex items-center justify-center text-sm font-semibold">
									{s.number}
								</div>
								<h3 className="font-semibold text-[15px] text-gray-900 tracking-tight">{s.title}</h3>
							</div>
							<p className="text-[13px] text-gray-600 leading-relaxed flex-1">{s.text}</p>
							<div className="mt-5 h-0.5 w-10 bg-gray-200 group-hover:w-full transition-all duration-400 group-hover:bg-gray-300"></div>
						</li>
					))}
				</ol>
			</section>

			{/* Trust / Disclaimer */}
			<section className="w-full rounded-2xl border border-gray-200 bg-white p-7 sm:p-10 shadow-sm">
				<div className="grid md:grid-cols-3 gap-10 items-start">
					<div className="md:col-span-2 space-y-6">
						<div>
							<h2 className="text-2xl font-bold mb-4 flex items-center gap-3">
								<div className="h-10 w-10 rounded-full bg-brand-fade flex items-center justify-center">
									<ShieldCheck className="h-6 w-6 text-brand" />
								</div>
								Privacy & Responsibility
							</h2>
							<p className="text-base text-gray-700 leading-relaxed">Your summaries are stored locally in your browser history so you control them. This tool is designed to assist—not diagnose or prescribe. Always follow professional medical guidance.</p>
						</div>
						<div className="flex flex-wrap gap-3">
							{[
								{ icon: Upload, label: 'Image / PDF Support' },
								{ icon: Languages, label: 'Multi-Language' },
								{ icon: Sparkles, label: 'AI Assisted' },
								{ icon: Clock, label: 'Lightning Fast' }
							].map(b => (
								<span key={b.label} className="px-4 py-2 rounded-full bg-brand-fade text-brand flex items-center gap-2 text-[12px] font-semibold cursor-default shadow-sm border border-brand/15">
									<b.icon className="h-4 w-4" /> {b.label}
								</span>
							))}
						</div>
					</div>
					<div className="space-y-4">
						<div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-4">
							<h3 className="font-semibold text-xs tracking-wider text-gray-900">QUICK START GUIDE</h3>
							<ul className="space-y-2.5 text-[13px] text-gray-700 font-medium">
								{[
									'Open Summarize page',
									'Upload or enable demo',
									'Wait ~2 seconds',
									'Expand the result',
									'Review & consult doctor'
								].map(item => (
									<li key={item} className="flex items-start gap-2">
										<CheckCircle2 className="h-4 w-4 text-emerald-500 mt-0.5 flex-shrink-0" /> {item}
									</li>
								))}
							</ul>
							<Link to="/summarize" className="btn-primary font-semibold text-sm justify-center mt-1">
								Try Now →
							</Link>
						</div>
					</div>
				</div>
			</section>

			{/* Final CTA */}
			<section className="w-full text-center py-16 sm:py-20 section-tight">
				<div className="w-full max-w-3xl mx-auto px-3">
					<h2 className="fluid-h2 font-bold mb-5 text-gray-900">Ready to Simplify Medical Text?</h2>
					<p className="text-gray-600 mb-8 sm:mb-10 text-base sm:text-xl leading-relaxed">Get instant summaries that turn complexity into clarity. Start understanding your health documents today.</p>
					<div className="flex flex-col sm:flex-row gap-5 sm:gap-6 justify-center stack-xs">
						<Link to="/summarize" className="btn-primary px-10 py-4 text-base font-semibold">
							Summarize a Document →
						</Link>
						<Link to="/history" className="btn-secondary px-10 py-4 text-base font-semibold">
							View Your History
						</Link>
					</div>
				</div>
			</section>
		</div>
	);
};

export default Home;