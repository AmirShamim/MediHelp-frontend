import React from 'react';
import { Link } from 'react-router-dom';

const Help = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <header>
        <h1 className="text-2xl font-bold">How to use MediHelp</h1>
        <p className="text-gray-600">Quick guidance to get accurate summaries from prescriptions and health reports.</p>
      </header>

      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Quick start</h2>
        <ol className="list-decimal pl-6 space-y-2 text-gray-700">
          <li><strong>Open</strong> the <Link to="/summarize" className="text-blue-600">Summarize</Link> page.</li>
          <li><strong>Upload</strong> a clear image or PDF of your prescription/report (max 5MB).</li>
          <li><strong>Choose</strong> the document type and language.</li>
          <li><strong>Click</strong> <em>Summarize</em> and wait — results appear on the right and are saved to your history.</li>
        </ol>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Tips for better results</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700">
          <li>Take photos in daylight or under bright, diffuse light. Avoid glare and shadows.</li>
          <li>Ensure text is in focus: use a steady hand or place the document on a flat surface.</li>
          <li>Prefer PDFs for lab reports; they usually contain clearer, machine-readable text.</li>
          <li>When multiple pages exist, upload a combined PDF if possible.</li>
          <li>Remove personal notes or annotations that might confuse OCR if not relevant.</li>
        </ul>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Troubleshooting</h2>
        <dl className="space-y-3 text-gray-700">
          <div>
            <dt className="font-medium">Upload fails or file rejected</dt>
            <dd>Check file size less than '5MB' and type (JPG/PNG/PDF). Try converting the file to PDF if problems persist.</dd>
          </div>
          <div>
            <dt className="font-medium">Summary is incomplete or missing</dt>
            <dd>The image may be blurry or cropped. Re-take the photo ensuring the full prescription is visible.</dd>
          </div>
          <div>
            <dt className="font-medium">I see a mock summary (development)</dt>
            <dd>This means the backend API keys are not set. See backend `.env` for `OPENAI_API_KEY` and `AZURE_VISION_*` keys.</dd>
          </div>
        </dl>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold mb-2">FAQ</h2>
        <details className="mb-2">
          <summary className="cursor-pointer">Why is there a separate Upload page?</summary>
          <div className="mt-2 text-gray-700">The Upload page is a simple shortcut/landing that points to the Summarize flow. The main upload and processing happens on the <Link to="/summarize" className="text-blue-600">Summarize</Link> page, where you can choose type and language. You can safely remove the Upload page if you prefer a single entry point.</div>
        </details>
        <details className="mb-2">
          <summary className="cursor-pointer">Where are my summaries stored?</summary>
          <div className="mt-2 text-gray-700">Summaries are saved locally in your browser (`localStorage`). They are not sent to any external storage unless you enable a backend history feature.</div>
        </details>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold mb-2">Accessibility & privacy</h2>
        <p className="text-gray-700">Keyboard accessible controls, readable font sizes, and clear contrast. Uploaded files are processed on the server and removed after processing; history remains in your browser only.</p>
      </section>

      <footer className="flex gap-3">
        <Link to="/summarize" className="btn-primary">Go to Summarize</Link>
        <Link to="/history" className="btn-secondary">View History</Link>
      </footer>
    </div>
  );
};

export default Help;