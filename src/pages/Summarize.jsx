import React, { useState, useEffect } from 'react';
import ImageUpload from '../components/upload/ImageUpload';
import SummaryCard from '../components/results/SummaryCard';
import Loading from '../components/common/Loading';
import { summarizePrescription } from '../services/api';

const Summarize = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [docType, setDocType] = useState('prescription');
  const [language, setLanguage] = useState('en');
  const [recent, setRecent] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('medihelp_history') || '[]');
      setRecent(stored.slice(0, 5));
    } catch (e) {
      setRecent([]);
    }
  }, []);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError(null);
    setSummary(null);
    if (file && file.type && file.type.startsWith('image/')) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

  const handleSummarize = async () => {
    if (!selectedFile) return;
    setIsProcessing(true);
    setError(null);
    try {
      const result = await summarizePrescription(selectedFile, { documentType: docType, language });
      setSummary(result.summary);
      // Save to local history
      const item = {
        id: Date.now(),
        fileName: selectedFile.name,
        docType,
        language,
        summary: result.summary,
        createdAt: new Date().toISOString(),
      };
      const existing = JSON.parse(localStorage.getItem('medihelp_history') || '[]');
      existing.unshift(item);
      const trimmed = existing.slice(0, 50);
      localStorage.setItem('medihelp_history', JSON.stringify(trimmed));
      setRecent(trimmed.slice(0, 5));
    } catch (err) {
      setError(err.message || 'Failed to process document');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div>
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">Summarize a Document</h2>
        <p className="text-gray-600">Upload a prescription or health report and receive a clear, patient-friendly summary.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        {/* Left column: upload and controls */}
        <div className="md:col-span-2 space-y-4">
          <div className="bg-white border rounded-lg p-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload document</label>
            <ImageUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          </div>

          <div className="bg-white border rounded-lg p-4 flex flex-col gap-3">
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Document type</label>
                <select aria-label="Document type" value={docType} onChange={(e) => setDocType(e.target.value)} className="border rounded px-3 py-2">
                  <option value="prescription">Prescription</option>
                  <option value="healthReport">Health Report</option>
                </select>
              </div>

              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-700">Language</label>
                <select aria-label="Language" value={language} onChange={(e) => setLanguage(e.target.value)} className="border rounded px-3 py-2">
                  <option value="en">English</option>
                  <option value="hi">Hindi</option>
                  <option value="ta">Tamil</option>
                  <option value="te">Telugu</option>
                  <option value="bn">Bengali</option>
                </select>
              </div>

              <div className="ml-auto">
                <button onClick={handleSummarize} disabled={!selectedFile || isProcessing} className="btn-primary" aria-disabled={!selectedFile || isProcessing}>
                  {isProcessing ? 'Processing...' : 'Summarize'}
                </button>
              </div>
            </div>

            <p className="text-sm text-gray-500">Tips: Use well-lit images, avoid blur, prefer PDFs for lab reports. Max file size: 5MB.</p>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            {isProcessing && <Loading />}
          </div>
        </div>

        {/* Right column: preview / summary / recent */}
        <aside className="md:col-span-1 space-y-4">
          <div className="bg-white border rounded-lg p-3">
            <h3 className="text-sm font-semibold mb-2">Preview</h3>
            {previewUrl ? (
              <img src={previewUrl} alt="Upload preview" className="w-full h-auto rounded" />
            ) : selectedFile ? (
              <p className="text-sm text-gray-600">Uploaded file: {selectedFile.name}</p>
            ) : (
              <p className="text-sm text-gray-500">No file selected yet. Choose a file to see a preview.</p>
            )}
          </div>

          <div className="bg-white border rounded-lg p-3">
            <h3 className="text-sm font-semibold mb-2">Result</h3>
            {summary ? (
              <SummaryCard summary={summary} docType={docType} />
            ) : (
              <p className="text-sm text-gray-500">Summary will appear here after processing.</p>
            )}
          </div>

          <div className="bg-white border rounded-lg p-3">
            <h3 className="text-sm font-semibold mb-2">Recent</h3>
            {recent.length === 0 ? (
              <p className="text-sm text-gray-500">No recent summaries</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {recent.map(r => (
                  <li key={r.id} className="border rounded px-2 py-1 bg-gray-50">
                    <div className="font-medium">{r.fileName}</div>
                    <div className="text-xs text-gray-500">{new Date(r.createdAt).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Summarize;