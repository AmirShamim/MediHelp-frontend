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
  const [demoMode, setDemoMode] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalSummary, setModalSummary] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Load recent history
  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('medihelp_history') || '[]');
      setRecent(stored.slice(0, 5));
    } catch {
      setRecent([]);
    }
  }, []);

  // Create preview URL for images / pdf
  useEffect(() => {
    if (!selectedFile) {
      setPreviewUrl(null);
      return;
    }
    const isImage = selectedFile.type && selectedFile.type.startsWith('image/');
    const isPDF = selectedFile.type === 'application/pdf' || (selectedFile.name && selectedFile.name.toLowerCase().endsWith('.pdf'));
    if (isImage || isPDF) {
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreviewUrl(null);
    return undefined;
  }, [selectedFile]);

  const handleFileSelect = (file) => {
    setSelectedFile(file);
    setError(null);
    setSummary(null);
  };

  const saveHistoryItem = (item) => {
    const existing = JSON.parse(localStorage.getItem('medihelp_history') || '[]');
    existing.unshift(item);
    const trimmed = existing.slice(0, 50);
    localStorage.setItem('medihelp_history', JSON.stringify(trimmed));
    setRecent(trimmed.slice(0, 5));
  };

  const handleSummarize = async () => {
    if (!selectedFile && !demoMode) {
      setError('Please upload a file first.');
      return;
    }
    setIsProcessing(true);
    setError(null);
    try {
      const start = Date.now();
      let generated;
      if (demoMode) {
        generated = docType === 'prescription' ? generateRandomPrescriptionSummary() : generateRandomHealthReportSummary();
      } else {
        const formData = new FormData();
        formData.append('file', selectedFile);
        formData.append('docType', docType);
        formData.append('lang', language);
        const res = await summarizePrescription(formData);
        generated = res?.data?.summary || 'Summary unavailable.';
      }
      const elapsed = Date.now() - start;
      const minMs = 1200;
      if (elapsed < minMs) await new Promise(r => setTimeout(r, minMs - elapsed));
      const summaryObj = {
        id: Date.now().toString(),
        fileName: selectedFile ? selectedFile.name : (docType === 'prescription' ? 'Demo Prescription' : 'Demo Health Report'),
        createdAt: new Date().toISOString(),
        docType,
        summary: generated,
      };
      setSummary(summaryObj.summary);
      setModalSummary(summaryObj.summary);
      saveHistoryItem(summaryObj);
      setShowModal(true);
      setShowResult(true);
    } catch {
      setError('Failed to generate summary.');
    } finally {
      setIsProcessing(false);
    }
  };

  const effectiveSummary = summary || (demoMode && selectedFile && getDemoSummaryByType(docType));
  const effectiveRecent = recent.length ? recent : (demoMode ? sampleRecentItems : []);

  return (
  <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl space-y-8 sm:space-y-10" role="main">
      {/* Header */}
  <div className="flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
        <div className="min-w-0 flex-1">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight gradient-text mb-2">📝 Summarize Documents</h1>
          <p className="text-sm text-gray-600">Upload prescriptions or health reports to generate an easy-to-read summary. Switch off demo mode after testing to use real processing.</p>
        </div>
  <div className="flex items-center gap-3 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 self-start flex-shrink-0">
          <label htmlFor="demoToggle" className="text-sm font-medium text-gray-700 flex items-center gap-2 whitespace-nowrap">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-100">🧪</span>
            <span className="hidden sm:inline">Demo Mode</span>
            <span className="sm:hidden">Demo</span>
          </label>
          <input id="demoToggle" type="checkbox" checked={demoMode} onChange={()=>{setDemoMode(d=>!d); setSummary(null);}} className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
        </div>
      </div>

      <div className="w-full grid gap-6 lg:gap-8 lg:grid-cols-[2fr_1fr] items-start">
        {/* Left (upload + controls) */}
        <div className="w-full min-w-0 space-y-6 order-2 lg:order-1">
          {/* Upload */}
            <div className="w-full glass rounded-2xl p-5 sm:p-6 interactive-panel shadow-lg">
              <label className="block text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="h-8 w-8 rounded-lg bg-brand-fade flex items-center justify-center">📄</span>
                <span className="truncate">Upload Document</span>
              </label>
              <ImageUpload onFileSelect={handleFileSelect} isProcessing={isProcessing} />
            </div>

            {/* Controls */}
            <div className="w-full glass rounded-2xl p-5 sm:p-6 flex flex-col gap-4 interactive-panel shadow-lg">
              <div className="w-full space-y-4">
                <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1 truncate">📋 Document Type</label>
                    <select value={docType} onChange={(e)=>setDocType(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 bg-white hover:border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all">
                      <option value="prescription">💊 Prescription</option>
                      <option value="healthReport">📊 Health Report</option>
                    </select>
                  </div>
                  <div className="w-full flex flex-col gap-2">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-1 truncate">🌐 Language</label>
                    <select value={language} onChange={(e)=>setLanguage(e.target.value)} className="w-full border-2 border-gray-200 rounded-lg px-4 py-2.5 bg-white hover:border-primary-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 transition-all">
                      <option value="en">English</option>
                      <option value="hi">हिन्दी (Hindi)</option>
                      <option value="ta">தமிழ் (Tamil)</option>
                      <option value="te">తెలుగు (Telugu)</option>
                      <option value="bn">বাংলা (Bengali)</option>
                    </select>
                  </div>
                </div>
                
                <div className="w-full flex flex-col sm:flex-row gap-3">
                  <button 
                    onClick={handleSummarize} 
                    disabled={isProcessing || (!selectedFile && !demoMode)} 
                    className="w-full sm:flex-1 btn-primary px-6 py-3 text-base"
                  >
                    {isProcessing ? '⏳ Processing...' : '✨ Summarize'}
                  </button>
                  {summary && (
                    <button 
                      onClick={()=>{setSummary(null); setSelectedFile(null); setPreviewUrl(null); setShowResult(false);}} 
                      className="w-full sm:w-auto btn-secondary px-6 py-3 text-sm whitespace-nowrap"
                    >
                      🔄 Clear
                    </button>
                  )}
                </div>
              </div>
              <div className="w-full bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800 leading-relaxed"><strong>💡 Tips:</strong> Use clear, well‑lit images. Prefer PDF for multi-page reports. Max size 5MB.</p>
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-lg p-3" role="alert"><p className="text-red-700 text-sm">{error}</p></div>
              )}
              {isProcessing && <div aria-live="assertive"><Loading /></div>}
            </div>
        </div>

        {/* Right (preview + result + recent) */}
        <aside className="w-full min-w-0 space-y-6 order-1 lg:order-2">
          {/* Preview */}
          <div className="w-full glass rounded-2xl p-5 interactive-panel shadow-lg">
            <h3 className="text-base font-bold mb-4 flex items-center gap-2"><span className="h-8 w-8 rounded-lg bg-purple-100 flex items-center justify-center">👁️</span>Preview</h3>
            {previewUrl ? (
              <div className="relative group">
                {(selectedFile?.type && selectedFile.type.startsWith('image/')) ? (
                  <img src={previewUrl} alt="Upload preview" className="w-full h-auto rounded-xl border-2 border-gray-200 shadow-md group-hover:shadow-lg transition-shadow" />
                ) : (
                  <div className="w-full h-64 overflow-hidden rounded-xl border-2 border-gray-200 shadow-md"><embed src={previewUrl} type="application/pdf" width="100%" height="100%" /></div>
                )}
                <div className="absolute top-2 right-2 bg-green-500 text-white text-xs px-3 py-1 rounded-full shadow-lg flex items-center gap-1"><span>✓</span> Ready</div>
              </div>
            ) : selectedFile ? (
              <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-dashed border-blue-300">
                <p className="text-sm text-gray-700 font-medium">📎 {selectedFile.name}</p>
                <p className="text-xs text-gray-500 mt-1">Preview not available</p>
              </div>
            ) : (
              <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8 rounded-xl border-2 border-dashed border-gray-300 text-center">
                <div className="h-16 w-16 mx-auto mb-3 rounded-full bg-gray-200 flex items-center justify-center"><span className="text-3xl">👁️</span></div>
                <p className="text-sm text-gray-600 font-medium">No Preview</p>
                <p className="text-xs text-gray-500 mt-1">Upload a file to see it here</p>
              </div>
            )}
          </div>

          {/* Result */}
          <div className="w-full glass rounded-2xl p-5 interactive-panel shadow-lg" aria-live="polite">
            <div className="flex items-center justify-between mb-4 gap-2">
              <h3 className="text-base font-bold flex items-center gap-2 min-w-0 flex-1"><span className="h-8 w-8 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">✨</span><span className="truncate">Result</span> {demoMode && !summary && <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full ml-1 flex-shrink-0">Demo</span>}</h3>
              <button onClick={()=>setShowResult(s=>!s)} className="text-sm btn-secondary px-4 py-2 flex-shrink-0 whitespace-nowrap" aria-expanded={showResult} aria-controls="summary-panel">{showResult ? '🔽' : '🔼'}</button>
            </div>
            {showResult ? (
              effectiveSummary ? <div id="summary-panel" className="w-full"><SummaryCard summary={effectiveSummary} docType={docType} /></div> : <p className="text-sm text-gray-500">Summary will appear here after processing.</p>
            ) : (
              <div className="text-sm text-gray-500 py-4 w-full"><p>Result hidden. Open to view once ready.</p></div>
            )}
          </div>

          {/* Recent */}
          <div className="w-full glass rounded-2xl p-5 interactive-panel shadow-lg">
            <h3 className="text-base font-bold mb-4 flex items-center justify-between gap-2"><span className="flex items-center gap-2 min-w-0 flex-1"><span className="h-8 w-8 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">📜</span><span className="truncate">Recent</span></span>{demoMode && effectiveRecent === sampleRecentItems && <span className="text-xs font-medium text-gray-500 bg-gray-100 px-3 py-1 rounded-full flex-shrink-0">Demo</span>}</h3>
            {effectiveRecent.length === 0 ? (
              <div className="w-full bg-gradient-to-br from-gray-50 to-gray-100 p-6 rounded-xl border-2 border-dashed border-gray-300 text-center"><p className="text-sm text-gray-600">📋 No recent summaries</p><p className="text-xs text-gray-500 mt-1">Your history will appear here</p></div>
            ) : (
              <ul className="w-full space-y-3 text-sm">
                {effectiveRecent.map(r => (
                  <li key={r.id} className="w-full glass rounded-xl p-4 interactive-panel border border-white/60 hover:border-primary-300">
                    <div className="flex items-start gap-3">
                      <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-orange-400 to-orange-600 flex items-center justify-center flex-shrink-0 shadow-md"><span className="text-white text-lg">{r.docType === 'healthReport' ? '📊' : '💊'}</span></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold text-gray-900 truncate mb-1" title={r.fileName}>{r.fileName}</div>
                        <div className="text-xs text-gray-500 mb-2">{new Date(r.createdAt).toLocaleString()}</div>
                        <Link to={`/result/${r.id}`} className="text-xs text-primary-600 hover:text-primary-700 font-semibold inline-flex items-center gap-1 group whitespace-nowrap">View Report <span className="group-hover:translate-x-1 transition-transform">→</span></Link>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </aside>
      </div>

      <Modal open={showModal} onClose={()=>setShowModal(false)} title="Summary Generated Successfully!" footer={<><button onClick={()=>setShowModal(false)} className="btn-secondary text-base px-6 py-3 whitespace-nowrap">Close</button><Link to={recent[0] ? `/result/${recent[0].id}` : '#'} className="btn-primary text-base px-6 py-3 whitespace-nowrap">Open Full Page →</Link></>}>
        <div className="w-full bg-gradient-to-br from-green-50 to-blue-50 p-4 rounded-xl border-2 border-green-200 mb-4">
          <p className="text-sm text-gray-700 flex items-center gap-2"><span className="text-xl flex-shrink-0">✅</span><span>This summary was generated {demoMode ? 'using demo data for illustration' : 'from your uploaded document'}.</span></p>
        </div>
        <div className="w-full"><SummaryCard summary={modalSummary} docType={docType} /></div>
      </Modal>
    </div>
  );
};

export default Summarize;