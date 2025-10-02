import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Info, Lightbulb, ShieldCheck, HelpCircle } from 'lucide-react';

const Help = () => {
  return (
    <div className="max-w-5xl mx-auto space-y-10">
      <header className="glass rounded-3xl p-10 shadow-xl animate-fade-slide relative overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_75%_25%,rgba(0,180,216,0.25),transparent_65%)]" />
        <div className="relative z-10">
          <h1 className="text-3xl sm:text-4xl font-bold mb-4 tracking-tight">
            <span className="gradient-text flex items-center gap-2"><HelpCircle className="h-7 w-7" /> How to use MediHelp</span>
          </h1>
          <p className="text-gray-700 text-lg font-medium leading-relaxed max-w-2xl">Quick guidance to get accurate summaries from prescriptions and health reports.</p>
          <nav aria-label="Page sections" className="mt-6 flex flex-wrap gap-3 text-[12px] font-semibold">
            {[
              ['#quickstart','Quick Start'],
              ['#tips','Tips'],
              ['#troubleshooting','Troubleshooting'],
              ['#faq','FAQ'],
              ['#privacy','Privacy']
            ].map(([href,label]) => (
              <a key={href} href={href} className="px-4 py-2 rounded-full bg-brand-fade text-brand hover:bg-brand hover:text-white transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand/40">{label}</a>
            ))}
          </nav>
        </div>
      </header>

      <section id="quickstart" className="glass rounded-2xl p-9 shadow-lg scroll-mt-24">
        <h2 className="text-2xl font-bold mb-7 flex items-center gap-3">
          <span className="gradient-text flex items-center gap-2"><ArrowRight className="h-5 w-5" /> Quick Start</span>
        </h2>
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['Open the', <>Open the <Link to="/summarize" className="text-brand font-bold underline hover:no-underline">Summarize</Link> page.</>],
            ['Upload', 'Upload a clear image or PDF (max 5MB).'],
            ['Choose', 'Select document type & language.'],
            ['Summarize', 'Click Summarize & review result.']
          ].map((step,i) => (
            <li key={i} className="glass rounded-xl p-5 flex flex-col gap-3 interactive-panel">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg gradient-brand text-white flex items-center justify-center text-sm font-bold shadow-md">{i+1}</div>
                <h3 className="font-semibold text-gray-800 text-sm tracking-tight">{step[0]}</h3>
              </div>
              <p className="text-[13px] text-gray-600 leading-relaxed font-medium pl-1">{step[1]}</p>
            </li>
          ))}
        </ol>
      </section>

      <section id="tips" className="glass rounded-2xl p-9 shadow-lg scroll-mt-24">
        <h2 className="text-2xl font-bold mb-7 flex items-center gap-3">
          <span className="gradient-text flex items-center gap-2"><Lightbulb className="h-6 w-6" /> Tips for better results</span>
        </h2>
        <ul className="space-y-4">
          <li className="flex items-start gap-3 text-gray-700 font-medium">
            <span className="text-xl flex-shrink-0">☀️</span>
            <span>Take photos in daylight or under bright, diffuse light. Avoid glare and shadows.</span>
          </li>
          <li className="flex items-start gap-3 text-gray-700 font-medium">
            <span className="text-xl flex-shrink-0">🎯</span>
            <span>Ensure text is in focus: use a steady hand or place the document on a flat surface.</span>
          </li>
          <li className="flex items-start gap-3 text-gray-700 font-medium">
            <span className="text-xl flex-shrink-0">📄</span>
            <span>Prefer PDFs for lab reports; they usually contain clearer, machine-readable text.</span>
          </li>
          <li className="flex items-start gap-3 text-gray-700 font-medium">
            <span className="text-xl flex-shrink-0">📚</span>
            <span>When multiple pages exist, upload a combined PDF if possible.</span>
          </li>
          <li className="flex items-start gap-3 text-gray-700 font-medium">
            <span className="text-xl flex-shrink-0">✏️</span>
            <span>Remove personal notes or annotations that might confuse OCR if not relevant.</span>
          </li>
        </ul>
      </section>

      <section id="troubleshooting" className="glass rounded-2xl p-9 shadow-lg scroll-mt-24">
        <h2 className="text-2xl font-bold mb-7 flex items-center gap-3">
          <span className="gradient-text flex items-center gap-2"><Info className="h-6 w-6" /> Troubleshooting</span>
        </h2>
        <dl className="space-y-6">
          <div className="p-5 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
            <dt className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-xl">❌</span> Upload fails or file rejected
            </dt>
            <dd className="text-gray-600 font-medium pl-7">Check file size less than 5MB and type (JPG/PNG/PDF). Try converting the file to PDF if problems persist.</dd>
          </div>
          <div className="p-5 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
            <dt className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-xl">📝</span> Summary is incomplete or missing
            </dt>
            <dd className="text-gray-600 font-medium pl-7">The image may be blurry or cropped. Re-take the photo ensuring the full prescription is visible.</dd>
          </div>
          <div className="p-5 rounded-xl bg-white/50 hover:bg-white/70 transition-colors">
            <dt className="font-bold text-gray-800 mb-2 flex items-center gap-2">
              <span className="text-xl">🔨</span> I see a mock summary (development)
            </dt>
            <dd className="text-gray-600 font-medium pl-7">This means the backend API keys are not set. See backend <code className="bg-gray-200 px-2 py-0.5 rounded text-xs">.env</code> for <code className="bg-gray-200 px-2 py-0.5 rounded text-xs">OPENAI_API_KEY</code> and <code className="bg-gray-200 px-2 py-0.5 rounded text-xs">AZURE_VISION_*</code> keys.</dd>
          </div>
        </dl>
      </section>

      <section id="faq" className="glass rounded-2xl p-9 shadow-lg scroll-mt-24">
        <h2 className="text-2xl font-bold mb-7 flex items-center gap-3">
          <span className="gradient-text flex items-center gap-2"><HelpCircle className="h-6 w-6" /> FAQ</span>
        </h2>
        <div className="space-y-5">
          <details className="group p-5 rounded-xl bg-white/50 hover:bg-white/70 transition-colors cursor-pointer">
            <summary className="font-bold text-gray-800 list-none flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-xl">📄</span> Why is there a separate Upload page?
              </span>
              <span className="text-brand group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 text-gray-600 font-medium pl-7 leading-relaxed">
              The Upload page is a simple shortcut/landing that points to the Summarize flow. The main upload and processing happens on the <Link to="/summarize" className="text-brand font-bold underline hover:no-underline">Summarize</Link> page, where you can choose type and language. You can safely remove the Upload page if you prefer a single entry point.
            </div>
          </details>
          <details className="group p-5 rounded-xl bg-white/50 hover:bg-white/70 transition-colors cursor-pointer">
            <summary className="font-bold text-gray-800 list-none flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="text-xl">💾</span> Where are my summaries stored?
              </span>
              <span className="text-brand group-open:rotate-180 transition-transform">▼</span>
            </summary>
            <div className="mt-4 text-gray-600 font-medium pl-7 leading-relaxed">
              Summaries are saved locally in your browser (<code className="bg-gray-200 px-2 py-0.5 rounded text-xs">localStorage</code>). They are not sent to any external storage unless you enable a backend history feature.
            </div>
          </details>
        </div>
      </section>

      <section id="privacy" className="glass rounded-2xl p-9 shadow-lg scroll-mt-24">
        <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
          <span className="gradient-text flex items-center gap-2"><ShieldCheck className="h-6 w-6" /> Accessibility & Privacy</span>
        </h2>
        <div className="grid md:grid-cols-3 gap-6 text-[13px] font-medium text-gray-700">
          <div className="bg-white/50 rounded-xl p-5 flex flex-col gap-2">
            <h3 className="text-xs font-bold tracking-wider text-brand">KEYBOARD</h3>
            <p>All interactive elements are focusable & follow a logical tab order.</p>
          </div>
          <div className="bg-white/50 rounded-xl p-5 flex flex-col gap-2">
            <h3 className="text-xs font-bold tracking-wider text-brand">CONTRAST</h3>
            <p>High-contrast text & controls for better readability.</p>
          </div>
            <div className="bg-white/50 rounded-xl p-5 flex flex-col gap-2">
            <h3 className="text-xs font-bold tracking-wider text-brand">PRIVACY</h3>
            <p>Files are processed and removed; history stays in your browser only.</p>
          </div>
        </div>
      </section>

      <section className="glass rounded-2xl p-10 shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4 gradient-text">Ready to try it?</h2>
        <p className="text-gray-600 mb-8 max-w-xl mx-auto text-sm">Jump into the Summarize page and generate your first clear prescription or report explanation in seconds.</p>
        <div className="flex flex-col sm:flex-row gap-5 justify-center">
          <Link to="/summarize" className="btn-primary px-8 py-4 text-sm font-semibold">Open Summarize →</Link>
          <Link to="/history" className="btn-secondary px-8 py-4 text-sm font-semibold">View History</Link>
        </div>
      </section>

      <footer className="text-center pb-4 pt-2 text-[11px] text-gray-500">Need more help? Contact the team in the repository README.</footer>
    </div>
  );
};

export default Help;