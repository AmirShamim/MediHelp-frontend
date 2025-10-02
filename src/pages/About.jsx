import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Globe, Zap, Cpu, Github } from 'lucide-react';

const Feature = ({ Icon, title, desc }) => (
  <div className="glass rounded-2xl p-6 flex items-start gap-4 interactive-panel shadow-md hover:shadow-xl transition-all hover:-translate-y-1">
    <div className="flex-shrink-0 bg-gradient-to-br from-primary-100 to-primary-50 rounded-2xl p-3 shadow-sm icon-tile-light">
      <Icon className="w-7 h-7 app-icon" />
    </div>
    <div>
      <h4 className="font-bold mb-2 text-gray-800">{title}</h4>
      <p className="text-sm text-gray-600 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

const Step = ({ number, title, desc, Icon }) => (
  <div className="flex gap-4 items-start group hover:translate-x-1 transition-transform">
  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-100 to-primary-50 flex items-center justify-center flex-shrink-0 shadow-sm group-hover:shadow-md transition-shadow icon-tile-light">
      {Icon ? (
  <span className="w-6 h-6 inline-block app-icon" aria-hidden>
          {Icon}
        </span>
      ) : (
        <div className="font-bold text-brand text-lg">{number}</div>
      )}
    </div>
    <div className="min-w-0 flex-1">
      <h5 className="font-bold text-gray-800 mb-1">{title}</h5>
      <p className="text-sm text-gray-600 leading-relaxed font-medium">{desc}</p>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="w-full space-y-8">
      <section className="glass rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row items-center gap-6 lg:gap-8 shadow-xl animate-fade-slide">
        <div className="flex-1">
          <h1 className="text-3xl font-bold mb-3 flex items-center gap-3">
            <span className="h-9 w-9 rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white text-lg shadow-md">ℹ️</span>
            <span className="gradient-text">About MediHelp</span>
          </h1>
          <p className="text-gray-700 mt-3 max-w-2xl leading-relaxed font-medium text-lg">
            MediHelp helps patients and caregivers understand prescriptions and lab reports by extracting text (OCR) and generating concise, patient-friendly summaries in multiple languages.
          </p>
          <div className="mt-6 flex gap-4">
            <Link to="/summarize" className="btn-primary inline-flex items-center gap-2">
              <span>✨</span> Try the summarizer
            </Link>
            <Link to="/help" className="btn-secondary inline-flex items-center gap-2">
              <span>❓</span> How it works
            </Link>
          </div>
        </div>
        <div className="ml-auto hidden lg:block">
          {/* Decorative SVG illustration */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-primary-200/30 to-brand/20 blur-2xl rounded-full"></div>
            <svg width="200" height="150" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden className="relative">
              <rect x="8" y="8" width="144" height="104" rx="12" fill="url(#grad1)" />
              <rect x="20" y="26" width="120" height="10" rx="5" fill="url(#grad2)" />
              <rect x="20" y="44" width="80" height="8" rx="4" fill="url(#grad3)" />
              <rect x="20" y="58" width="100" height="8" rx="4" fill="url(#grad3)" />
              <circle cx="48" cy="92" r="12" fill="url(#grad4)" />
              <circle cx="80" cy="92" r="12" fill="url(#grad5)" />
              <defs>
                <linearGradient id="grad1" x1="0" y1="0" x2="160" y2="120">
                  <stop offset="0%" stopColor="#EFF6FF" />
                  <stop offset="100%" stopColor="#DBEAFE" />
                </linearGradient>
                <linearGradient id="grad2" x1="0" y1="0" x2="120" y2="0">
                  <stop offset="0%" stopColor="#BFDBFE" />
                  <stop offset="100%" stopColor="#93C5FD" />
                </linearGradient>
                <linearGradient id="grad3" x1="0" y1="0" x2="100" y2="0">
                  <stop offset="0%" stopColor="#93C5FD" />
                  <stop offset="100%" stopColor="#60A5FA" />
                </linearGradient>
                <linearGradient id="grad4" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stopColor="#60A5FA" />
                  <stop offset="100%" stopColor="#3B82F6" />
                </linearGradient>
                <linearGradient id="grad5" x1="0" y1="0" x2="24" y2="24">
                  <stop offset="0%" stopColor="#3B82F6" />
                  <stop offset="100%" stopColor="#2563EB" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-6">
        <Feature Icon={FileText} title="Accurate OCR" desc="Extracts text from images and PDFs so prescriptions and reports aren't missed." />
        <Feature Icon={Zap} title="Clear Summaries" desc="Converts clinical instructions into plain language with dosage and warnings highlighted." />
        <Feature Icon={Globe} title="Multi-language" desc="Provide summaries in multiple languages for better accessibility." />
      </section>

  <section className="glass rounded-2xl p-6 sm:p-8 shadow-lg">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white text-base shadow-md">🔄</span>
          <span className="gradient-text">How it works</span>
        </h3>
        <div className="mt-6 space-y-5">
          <Step
            number={1}
            title="Upload"
            desc="Provide a clear image or PDF of your prescription or health report."
            Icon={(
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block" aria-hidden>
                <path d="M12 3v9" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 7l4-4 4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          />

          <Step
            number={2}
            title="OCR & Analyze"
            desc="The app extracts text and the AI identifies medications, dosages, and abnormal values."
            Icon={(
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block" aria-hidden>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 9h4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          />

          <Step
            number={3}
            title="Review summary"
            desc="Receive a patient-friendly summary with instructions and warnings you can save to history."
            Icon={(
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="block" aria-hidden>
                <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M21 12v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            )}
          />
        </div>
      </section>

  <section className="glass rounded-2xl p-6 sm:p-8 shadow-lg">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary-600 to-primary-500 flex items-center justify-center text-white text-base shadow-md">💎</span>
          <span className="gradient-text">Our values</span>
        </h3>
        <ul className="space-y-4">
          <li className="flex items-start gap-3 p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
            <span className="text-2xl">✨</span>
            <div>
              <strong className="text-gray-800 font-bold">Clarity:</strong>
              <p className="text-gray-600 font-medium mt-1">Keep medical information understandable.</p>
            </div>
          </li>
          <li className="flex items-start gap-3 p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
            <span className="text-2xl">🔒</span>
            <div>
              <strong className="text-gray-800 font-bold">Privacy:</strong>
              <p className="text-gray-600 font-medium mt-1">Files are removed from the server after processing; history is stored locally by default.</p>
            </div>
          </li>
          <li className="flex items-start gap-3 p-4 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
            <span className="text-2xl">♿</span>
            <div>
              <strong className="text-gray-800 font-bold">Accessibility:</strong>
              <p className="text-gray-600 font-medium mt-1">Keyboard-first controls and multi-language support.</p>
            </div>
          </li>
        </ul>
      </section>

  <section className="glass rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg hover:shadow-xl transition-shadow">
        <div className="flex-1">
          <h3 className="text-2xl font-bold mb-2">
            <span className="gradient-text">🤝 Get involved</span>
          </h3>
          <p className="text-gray-600 font-medium">Contribute, report issues, or follow development on GitHub.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 btn-primary">
            <Github className="w-5 h-5" />
            <span>View on GitHub</span>
          </a>
        </div>
      </section>

  <div className="glass rounded-2xl p-5 sm:p-6 border-2 border-red-200/60 bg-gradient-to-br from-red-50/80 to-orange-50/60 shadow-lg">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-red-100 flex items-center justify-center flex-shrink-0 shadow-sm">
            <span className="text-2xl">⚠️</span>
          </div>
          <div>
            <p className="text-sm text-red-800 font-bold mb-1">Medical Disclaimer</p>
            <p className="text-sm text-red-700 leading-relaxed font-medium">
              AI-generated summaries are for informational purposes only and do not substitute professional medical advice. Always consult with a qualified healthcare provider for medical decisions.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;