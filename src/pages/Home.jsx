import React, { useState } from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import ImageUpload from '../components/upload/ImageUpload';
import SummaryCard from '../components/results/SummaryCard';
import Loading from '../components/common/Loading';
import { summarizePrescription } from '../services/api';

const Home = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError(null);
    setSummary(null);
  };

  const handleSummarize = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    setError(null);

    try {
      const result = await summarizePrescription(selectedFile);
      setSummary(result.summary);
    } catch (err) {
      setError(err.message || 'Failed to process prescription');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              AI Prescription Summarizer
            </h2>
            <p className="text-xl text-gray-600">
              Upload your prescription and get a clear, patient-friendly summary
            </p>
          </div>

          <div className="space-y-8">
            <ImageUpload 
              onFileSelect={handleFileSelect} 
              isProcessing={isProcessing}
            />

            {selectedFile && !isProcessing && !summary && (
              <div className="text-center">
                <button
                  onClick={handleSummarize}
                  className="btn-primary"
                >
                  Summarize Prescription
                </button>
              </div>
            )}

            {isProcessing && <Loading />}

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <p className="text-red-700">{error}</p>
              </div>
            )}

            {summary && <SummaryCard summary={summary} />}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Home;