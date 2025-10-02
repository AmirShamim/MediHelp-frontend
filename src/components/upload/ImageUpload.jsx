import React, { useState, useCallback } from 'react';
import { Upload, Camera, FileText } from 'lucide-react';

const ImageUpload = ({ onFileSelect, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  }, [onFileSelect]);

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      onFileSelect(file);
    }
  };

  return (
    <div className="w-full">
      <div
        className={`relative w-full border-3 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all duration-300 ${
          dragActive
            ? 'border-primary-500 bg-primary-50 shadow-lg scale-[1.02]'
            : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        } ${isProcessing ? 'opacity-50 pointer-events-none' : 'cursor-pointer'} ${
          selectedFile ? 'bg-green-50 border-green-400' : ''
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept="image/*,application/pdf"
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          disabled={isProcessing}
          aria-label="Upload prescription or health report"
        />
        
        <div className="flex flex-col items-center w-full">
          <div className={`h-20 w-20 rounded-full flex items-center justify-center mb-6 transition-all duration-300 flex-shrink-0 ${
            dragActive 
              ? 'bg-primary-500 scale-110' 
              : selectedFile 
                ? 'bg-green-500' 
                : 'bg-gradient-to-br from-primary-400 to-primary-600'
          } shadow-xl`}>
            {selectedFile ? (
              <FileText className="h-10 w-10 text-white" />
            ) : (
              <Upload className="h-10 w-10 text-white" />
            )}
          </div>
          
          <p className="text-xl font-bold text-gray-900 mb-2 px-2 break-words w-full">
            {selectedFile ? 'File Selected ✓' : 'Upload Prescription Image'}
          </p>
          
          {!selectedFile && (
            <>
              <p className="text-base text-gray-600 mb-6 w-full max-w-sm px-4 break-words">
                Drag and drop your file here, or{' '}
                <span className="text-primary-600 font-semibold underline">click to browse</span>
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-sm text-gray-500 bg-white px-4 py-2 rounded-lg border border-gray-200">
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <Camera className="h-4 w-4 flex-shrink-0" />
                  <span>JPG, PNG</span>
                </div>
                <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
                <div className="flex items-center gap-1 whitespace-nowrap">
                  <FileText className="h-4 w-4 flex-shrink-0" />
                  <span>PDF</span>
                </div>
                <div className="h-4 w-px bg-gray-300 hidden sm:block"></div>
                <span className="whitespace-nowrap">Max 5MB</span>
              </div>
            </>
          )}
        </div>

        {selectedFile && (
          <div className="mt-6 p-4 bg-white rounded-xl border-2 border-green-300 shadow-sm w-full">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="h-10 w-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                  <FileText className="h-5 w-5 text-green-600" />
                </div>
                <div className="text-left min-w-0 flex-1">
                  <p className="text-sm font-semibold text-gray-900 truncate w-full">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedFile(null);
                  onFileSelect(null);
                }}
                className="h-8 w-8 rounded-lg bg-red-100 hover:bg-red-200 flex items-center justify-center transition-colors"
                aria-label="Remove file"
              >
                <span className="text-red-600 text-lg">×</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ImageUpload;