import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="">
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">MediHelp</h2>
        <p className="text-lg text-gray-600 mb-6">
          AI-powered summaries for prescriptions and health reports, in your language.
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/summarize" className="btn-primary">Summarize Now</Link>
          <Link to="/help" className="btn-secondary">How it works</Link>
        </div>
      </section>

  <section className="grid md:grid-cols-3 gap-6 mt-8">
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Prescription Summary</h3>
          <p className="text-gray-600">Upload a prescription and get a clear, patient-friendly summary with dosage and frequency.</p>
        </div>
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Health Report Insights</h3>
          <p className="text-gray-600">Get key highlights from lab reports with normal ranges and flagged values explained.</p>
        </div>
        <div className="bg-white border rounded-lg p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-2">Multi-language Support</h3>
          <p className="text-gray-600">Receive summaries in your preferred language for better understanding.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;