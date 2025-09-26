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
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900 mb-1">Summarize a Document</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">Upload a prescription or health report and receive a clear, patient-friendly summary. Demo data is shown to illustrate output.</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4 animate-fade-slide">
        <div className="flex items-center gap-2 text-sm glass rounded px-3 py-2 w-fit interactive-panel">
          <input id="demo-toggle" type="checkbox" className="cursor-pointer" checked={demoMode} onChange={(e)=>setDemoMode(e.target.checked)} />
          <label htmlFor="demo-toggle" className="cursor-pointer select-none">Show demo content</label>
        </div>
        <p className="text-xs text-gray-500">Turn this off after uploading a real file to view only your actual results.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6 items-start">
        {/* Left column: upload and controls */}
        <div className="md:col-span-2 space-y-4 order-2 md:order-1 stagger-children">
          <div className="glass rounded-lg p-4 interactive-panel">
            <label className="block text-sm font-medium text-gray-700 mb-2">Upload document</label>
            <ImageUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />
          </div>

          <div className="glass rounded-lg p-4 flex flex-col gap-3 interactive-panel">
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

              <div className="ml-auto flex gap-2">
                <button onClick={handleSummarize} disabled={isProcessing || (!selectedFile && !demoMode)} className="btn-primary whitespace-nowrap" aria-disabled={isProcessing || (!selectedFile && !demoMode)}>
                  {isProcessing ? 'Processing...' : 'Summarize'}
                </button>
                {summary && (
                  <button onClick={()=>{setSummary(null); setSelectedFile(null); setPreviewUrl(null); setShowResult(false);}} className="btn-secondary text-sm whitespace-nowrap">Clear</button>
                )}
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
        <aside className="md:col-span-1 space-y-4 order-1 md:order-2 stagger-children">
          <div className="glass rounded-lg p-3 interactive-panel">
            <h3 className="text-sm font-semibold mb-2">Preview</h3>
            {previewUrl ? (
              // Show image preview or PDF embed depending on file type
              (selectedFile && selectedFile.type && selectedFile.type.startsWith('image/')) ? (
                <img src={previewUrl} alt="Upload preview" className="w-full h-auto rounded" />
              ) : (
                // Treat as PDF if previewUrl exists but not image
                <div className="w-full h-48 overflow-hidden rounded">
                  <embed src={previewUrl} type="application/pdf" width="100%" height="100%" />
                </div>
              )
            ) : selectedFile ? (
              <p className="text-sm text-gray-600">Uploaded file: {selectedFile.name}</p>
            ) : (
              <p className="text-sm text-gray-500">No file selected yet. Choose a file to see a preview.</p>
            )}
          </div>

          <div className="glass rounded-lg p-3 interactive-panel">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-semibold">Result {demoMode && !summary && <span className="text-[10px] font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded ml-2">Demo</span>}</h3>
              <div className="flex items-center gap-2">
                <button onClick={() => setShowResult(s => !s)} className="text-xs btn-secondary px-2 py-1">
                  {showResult ? 'Collapse' : 'Open'}
                </button>
              </div>
            </div>

            {showResult ? (
              effectiveSummary ? (
                <SummaryCard summary={effectiveSummary} docType={docType} />
              ) : (
                <p className="text-sm text-gray-500">Summary will appear here after processing.</p>
              )
            ) : (
              <div className="text-sm text-gray-500 py-4">
                <p>Result is hidden. Click "Open" to view the summary after generation.</p>
              </div>
            )}
          </div>

          <div className="glass rounded-lg p-3 interactive-panel">
            <h3 className="text-sm font-semibold mb-2 flex items-center justify-between">Recent {demoMode && effectiveRecent === sampleRecentItems && <span className="text-[10px] font-normal text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Demo</span>}</h3>
            {effectiveRecent.length === 0 ? (
              <p className="text-sm text-gray-500">No recent summaries</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {effectiveRecent.map(r => (
                  <li key={r.id} className="glass rounded px-2 py-1 interactive-panel">
                    <div className="font-medium truncate" title={r.fileName}>{r.fileName}</div>
                    <div className="text-xs text-gray-500 mb-1">{new Date(r.createdAt).toLocaleString()}</div>
                    <Link to={`/result/${r.id}`} className="text-xs text-blue-600 hover:underline">View full report →</Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      <Modal open={showModal} onClose={()=>setShowModal(false)} title="Generated Summary" footer={
        <>
          <button onClick={()=>setShowModal(false)} className="btn-secondary text-sm">Close</button>
          <Link to={recent[0] ? `/result/${recent[0].id}` : '#'} className="btn-primary text-sm">Open Full Page</Link>
        </>
      }>
        <p className="text-sm text-gray-500">This summary was generated {demoMode ? 'using mock data' : 'from your document'}.</p>
        <SummaryCard summary={modalSummary} docType={docType} />
      </Modal>
    </div>
  );
};

export default Summarize;