import React, { useState, useEffect } from 'react';
import ImageUpload from '../components/upload/ImageUpload';
import SummaryCard from '../components/results/SummaryCard';
import Loading from '../components/common/Loading';
import Modal from '../components/common/Modal';
import { Link } from 'react-router-dom';
import { summarizePrescription } from '../services/api';
import { getDemoSummaryByType, sampleRecentItems, generateRandomPrescriptionSummary, generateRandomHealthReportSummary } from '../utils/mockData';

const Summarize = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [summary, setSummary] = useState(null);
  const [error, setError] = useState(null);
  const [docType, setDocType] = useState('prescription');
  const [language, setLanguage] = useState('en');
  const [recent, setRecent] = useState([]);
  const [demoMode, setDemoMode] = useState(true); // demo on initially
  const [showModal, setShowModal] = useState(false);
  const [modalSummary, setModalSummary] = useState(null);
  const [showResult, setShowResult] = useState(false); // collapsed by default

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('medihelp_history') || '[]');
      setRecent(stored.slice(0, 5));
    } catch (e) {
      setRecent([]);
    }
  }, []);

  // Create preview URL whenever selectedFile changes (supports images and PDFs)
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }

    // If selectedFile is a File or has a type
    const isImage = selectedFile.type && selectedFile.type.startsWith('image/');
    const isPDF = selectedFile.type === 'application/pdf' || (selectedFile.name && selectedFile.name.toLowerCase().endsWith('.pdf'));

    if (isImage || isPDF) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => {
        URL.revokeObjectURL(url);
        setPreviewUrl(null);
      };
    }

    // fallback: no preview
    setPreviewUrl(null);
    return undefined;
  }, [selectedFile]);

  const handleFileSelect = (file) => {
    // keep this helper for any components that expect it
    setSelectedFile(file);
    setError(null);
    setSummary(null);
  };

  useEffect(() => () => { if (previewUrl) URL.revokeObjectURL(previewUrl); }, [previewUrl]);

  const saveHistoryItem = (item) => {
    const existing = JSON.parse(localStorage.getItem('medihelp_history') || '[]');
    existing.unshift(item);
    const trimmed = existing.slice(0, 50);
    localStorage.setItem('medihelp_history', JSON.stringify(trimmed));
    setRecent(trimmed.slice(0, 5));
  };

  // Simulated processing: always take at least 2 seconds
  const handleSummarize = async () => {
    if (!selectedFile && demoMode) {
      // If no file but demoMode: still simulate a random generation
      simulateRandomSummary();
      return;
    }
    if (!selectedFile) return;
    setIsProcessing(true);
    setError(null);
    const start = Date.now();
    try {
      let resultSummary = null;
      try {
        const result = await summarizePrescription(selectedFile, { documentType: docType, language });
        resultSummary = result.summary;
      } catch (apiErr) {
        // fallback to random mock if API fails in demo mode
        if (demoMode) {
          resultSummary = docType === 'healthReport' ? generateRandomHealthReportSummary() : generateRandomPrescriptionSummary();
        } else throw apiErr;
      }
      const elapsed = Date.now() - start;
      const remaining = 2000 - elapsed; // enforce 2s
      if (remaining > 0) await new Promise(r => setTimeout(r, remaining));

      setSummary(resultSummary);
      setShowResult(true);
      const item = {
        id: Date.now(),
        fileName: selectedFile ? (selectedFile.name || 'document') : 'demo_document',
        docType,
        language,
        summary: resultSummary,
        createdAt: new Date().toISOString(),
      };
      saveHistoryItem(item);
      setModalSummary(resultSummary);
      setShowModal(true);
      setDemoMode(false);
    } catch (err) {
      setError(err.message || 'Failed to process document');
    } finally {
      setIsProcessing(false);
    }
  };

  const simulateRandomSummary = async () => {
    setIsProcessing(true);
    setError(null);
    const start = Date.now();
    const randomSummary = docType === 'healthReport' ? generateRandomHealthReportSummary() : generateRandomPrescriptionSummary();
    const elapsed = Date.now() - start;
    const remaining = 2000 - elapsed;
    if (remaining > 0) await new Promise(r => setTimeout(r, remaining));
    setSummary(randomSummary);
    setShowResult(true);
    const item = {
      id: Date.now(),
      fileName: 'demo_document',
      docType,
      language,
      summary: randomSummary,
      createdAt: new Date().toISOString(),
    };
    saveHistoryItem(item);
    setModalSummary(randomSummary);
    setShowModal(true);
    setIsProcessing(false);
  };

  // Provide demo summary if in demo mode and no real summary yet
  const effectiveSummary = summary || (demoMode ? getDemoSummaryByType(docType) : null);
  const effectiveRecent = (recent && recent.length > 0) ? recent : (demoMode ? sampleRecentItems : []);

  return (
    <div>
      <div className="text-center mb-8 animate-fade-slide">
        <h2 className="text-4xl font-bold text-gray-900 mb-3 gradient-text">Summarize Your Document</h2>
        <p className="text-gray-600 max-w-3xl mx-auto text-lg leading-relaxed">Upload a prescription or health report and receive a clear, patient-friendly summary in seconds. Try our demo mode to see it in action.</p>
      </div>

  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6 animate-fade-slide" aria-live="polite">
        <div className="flex items-center gap-3 text-sm glass rounded-lg px-4 py-3 w-fit interactive-panel shadow-md">
          <input id="demo-toggle" type="checkbox" className="cursor-pointer h-4 w-4 accent-primary-500" checked={demoMode} onChange={(e)=>setDemoMode(e.target.checked)} />
          <label htmlFor="demo-toggle" className="cursor-pointer select-none font-medium text-gray-700">Show demo content</label>
        </div>
        <p className="text-sm text-gray-500 bg-gray-50 px-4 py-2 rounded-lg">💡 Turn this off after uploading to view only your results</p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 items-start">
        {/* Left column: upload and controls */}
        <div className="md:col-span-2 space-y-6 order-2 md:order-1 stagger-children">
          <div className="glass rounded-2xl p-6 interactive-panel shadow-lg">
            <label className="block text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-brand-fade flex items-center justify-center">📄</span>
              Upload Document
            </label>
            <ImageUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          </div>

          <div className="glass rounded-2xl p-6 flex flex-col gap-4 interactive-panel shadow-lg">
            <div className="flex flex-wrap items-center gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  📋 Document Type
                </label>
                <select aria-label="Document type" value={docType} onChange={(e) => setDocType(e.target.value)} className="border-2 border-gray-200 rounded-lg px-4 py-2.5 bg-white hover:border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all">
                  <option value="prescription">💊 Prescription</option>
                  <option value="healthReport">📊 Health Report</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                  🌐 Language
                </label>
                <select aria-label="Language" value={language} onChange={(e) => setLanguage(e.target.value)} className="border-2 border-gray-200 rounded-lg px-4 py-2.5 bg-white hover:border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all">
                  <option value="en">English</option>
                  <option value="hi">हिन्दी (Hindi)</option>
                  <option value="ta">தமிழ் (Tamil)</option>
                  <option value="te">తెలుగు (Telugu)</option>
                  <option value="bn">বাংলা (Bengali)</option>
                </select>
              </div>

              <div className="ml-auto flex gap-3 items-end">
                <button onClick={handleSummarize} disabled={isProcessing || (!selectedFile && !demoMode)} className="btn-primary whitespace-nowrap px-6 py-3 text-base" aria-disabled={isProcessing || (!selectedFile && !demoMode)} aria-busy={isProcessing}>
                  {isProcessing ? '⏳ Processing...' : '✨ Summarize'}
                </button>
                {summary && (
                  <button onClick={()=>{setSummary(null); setSelectedFile(null); setPreviewUrl(null); setShowResult(false);}} className="btn-secondary text-sm whitespace-nowrap">🔄 Clear</button>
                )}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800 leading-relaxed">
                <strong>💡 Tips:</strong> Use well-lit images, avoid blur, prefer PDFs for lab reports. Max file size: 5MB.
              </p>
            </div>
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3" role="alert">
                <p className="text-red-700">{error}</p>
              </div>
            )}
            {isProcessing && <div aria-live="assertive"><Loading /></div>}
          </div>
        </div>

        {/* Right column: preview / summary / recent */}
        <aside className="md:col-span-1 space-y-6 order-1 md:order-2 stagger-children">
          <div className="glass rounded-2xl p-5 interactive-panel shadow-lg">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2">
              <span className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">👁️</span>
              Preview
            </h3>
            {previewUrl ? (
              <div className="relative group">
                {(selectedFile && selectedFile.type && selectedFile.type.startsWith('image/')) ? (
                  <img 
                    src={previewUrl} 
                    alt="Upload preview" 
                    className="w-full h-auto rounded-xl border-2 border-gray-200 shadow-md group-hover:shadow-lg transition-shadow" 
                  />
                ) : (
                  <div className="w-full h-64 overflow-hidden rounded-xl border-2 border-gray-200 shadow-md">
                    <embed src={previewUrl} type="application/pdf" width="100%" height="100%" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                  <span>✓</span> Ready
                </div>
              </div>
            ) : selectedFile ? (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-dashed border-blue-300">
                <p className="text-sm text-gray-700 font-medium">📎 {selectedFile.name}</p>
                <p className="text-xs text-gray-500 mt-1">Preview not available for this file type</p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl border-2 border-dashed border-gray-300 text-center">
                <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center">
                  <span className="text-3xl">👁️</span>
                </div>
                <p className="text-sm text-gray-600 font-medium">No Preview Available</p>
                <p className="text-xs text-gray-500 mt-1">Upload a file to see preview</p>
              </div>
            )}
          </div>

          <div className="glass rounded-2xl p-5 interactive-panel shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center">✨</span>
                Result {demoMode && !summary && <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full ml-2">Demo</span>}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowResult(s => !s)}
                  className="text-sm btn-secondary px-4 py-2"
                  aria-expanded={showResult}
                  aria-controls="summary-panel"
                >
                  {showResult ? '🔽 Collapse' : '🔼 Open'}
                </button>
              </div>
            </div>

            {showResult ? (
              effectiveSummary ? (
                <div id="summary-panel"><SummaryCard summary={effectiveSummary} docType={docType} /></div>
              ) : (
                <p className="text-sm text-gray-500">Summary will appear here after processing.</p>
              )
            ) : (
              <div className="text-sm text-gray-500 py-4">
                <p>Result is hidden. Click "Open" to view the summary after generation.</p>
              </div>
            )}
          </div>

          <div className="glass rounded-2xl p-5 interactive-panel shadow-lg">
            <h3 className="text-base font-bold mb-4 flex items-center justify-between">
              <span className="flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center">📜</span>
                Recent
              </span>
              {demoMode && effectiveRecent === sampleRecentItems && <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full">Demo</span>}
            </h3>
            {effectiveRecent.length === 0 ? (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-dashed border-gray-300 text-center">
                <p className="text-sm text-gray-600">📋 No recent summaries</p>
                <p className="text-xs text-gray-500 mt-1">Your history will appear here</p>
              </div>
            ) : (
              <ul className="space-y-3 text-sm">
                {effectiveRecent.map(r => (
                  <li key={r.id} className="glass rounded-xl p-4 interactive-panel border border-white/60 hover:border-primary-300">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md">
                        <span className="text-white text-lg">
                          {r.docType === 'healthReport' ? '📊' : '💊'}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate mb-1" title={r.fileName}>{r.fileName}</div>
                        <div className="text-xs text-gray-500 mb-2">{new Date(r.createdAt).toLocaleString()}</div>
                        <Link 
                          to={`/result/${r.id}`} 
                          className="text-xs text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-1 group"
                        >
                          View Report 
                          <span className="group-hover:translate-x-1 transition-transform">→</span>
                        </Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      <Modal open={showModal} onClose={()=>setShowModal(false)} title="Summary Generated Successfully!" footer={
        <>
          <button onClick={()=>setShowModal(false)} className="btn-secondary text-base px-6 py-3">Close</button>
          <Link to={recent[0] ? `/result/${recent[0].id}` : '#'} className="btn-primary text-base px-6 py-3">Open Full Page →</Link>
        </>
      }>
        <div className="bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-xl border-2 border-green-200 mb-4">
          <p className="text-sm text-gray-700 flex items-center gap-2">
            <span className="text-xl">✅</span>
            <span>This summary was generated {demoMode ? 'using demo data for illustration' : 'from your uploaded document'}.</span>
          </p>
        </div>
        <SummaryCard summary={modalSummary} docType={docType} />
      </Modal>
    </div>
  );
};

export default Summarize;