import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Globe, Zap, Cpu, Github } from 'lucide-react';

const Feature = ({ Icon, title, desc }) => (
  <div className="card p-4 flex items-start gap-3">
    <div className="flex-shrink-0 bg-blue-50 rounded-full p-2">
      <Icon className="w-6 h-6 text-blue-600" />
    </div>
    <div>
      <h4 className="font-semibold mb-1">{title}</h4>
      <p className="text-sm text-gray-700">{desc}</p>
    </div>
  </div>
);

const Step = ({ number, title, desc, Icon }) => (
  <div className="flex gap-3 items-start">
    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
      {Icon ? (
        <span className="w-6 h-6 inline-block text-slate-800" aria-hidden>
          {Icon}
        </span>
      ) : (
        <div className="font-semibold text-slate-800">{number}</div>
      )}
    </div>
    <div className="min-w-0">
      <h5 className="font-medium text-slate-900 truncate">{title}</h5>
      <p className="text-sm text-gray-600">{desc}</p>
    </div>
  </div>
);

const About = () => {
  return (
    <div className="space-y-6">
      <section className="bg-white border rounded-lg p-6 flex items-center gap-6">
        <div>
          <h1 className="text-2xl font-bold">About MediHelp</h1>
          <p className="text-gray-600 mt-2 max-w-xl">MediHelp helps patients and caregivers understand prescriptions and lab reports by extracting text (OCR) and generating concise, patient-friendly summaries in multiple languages.</p>
          <div className="mt-4 flex gap-3">
            <Link to="/summarize" className="btn-primary">Try the summarizer</Link>
            <Link to="/help" className="btn-secondary">How it works</Link>
          </div>
        </div>
        <div className="ml-auto hidden md:block">
          {/* Decorative SVG illustration */}
          <svg width="160" height="120" viewBox="0 0 160 120" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
            <rect x="8" y="8" width="144" height="104" rx="8" fill="#EFF6FF" />
            <rect x="20" y="26" width="120" height="10" rx="3" fill="#DBEAFE" />
            <rect x="20" y="44" width="80" height="8" rx="3" fill="#BFDBFE" />
            <rect x="20" y="58" width="100" height="8" rx="3" fill="#BFDBFE" />
            <circle cx="48" cy="92" r="10" fill="#BFDBFE" />
            <circle cx="80" cy="92" r="10" fill="#93C5FD" />
          </svg>
        </div>
      </section>

      <section className="grid md:grid-cols-3 gap-4">
        <Feature Icon={FileText} title="Accurate OCR" desc="Extracts text from images and PDFs so prescriptions and reports aren't missed." />
        <Feature Icon={Zap} title="Clear Summaries" desc="Converts clinical instructions into plain language with dosage and warnings highlighted." />
        <Feature Icon={Globe} title="Multi-language" desc="Provide summaries in multiple languages for better accessibility." />
      </section>

      <section className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold">How it works</h3>
        <div className="mt-4 space-y-3">
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

      <section className="bg-white border rounded-lg p-6">
        <h3 className="text-lg font-semibold">Our values</h3>
        <ul className="list-disc pl-6 mt-3 space-y-2 text-gray-700">
          <li><strong>Clarity:</strong> Keep medical information understandable.</li>
          <li><strong>Privacy:</strong> Files are removed from the server after processing; history is stored locally by default.</li>
          <li><strong>Accessibility:</strong> Keyboard-first controls and multi-language support.</li>
        </ul>
      </section>

      <section className="bg-white border rounded-lg p-6 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Get involved</h3>
          <p className="text-gray-700">Contribute, report issues, or follow development on GitHub.</p>
        </div>
        <div className="flex items-center gap-3">
          <a href="https://github.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2 btn-secondary">
            <Github className="w-5 h-5" />
            <span>GitHub</span>
          </a>
        </div>
      </section>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-700">
          <strong>Disclaimer:</strong> AI-generated summaries are for informational purposes only and do not substitute professional medical advice.
        </p>
      </div>
    </div>
  );
};

export default About;