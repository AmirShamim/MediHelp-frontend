import React from 'react';
import { AlertTriangle, Pill, FileText } from 'lucide-react';

const SummaryCard = ({ summary, docType = 'prescription' }) => {
  const isHealthReport = docType === 'healthReport' || (!!summary && (summary.abnormalities || summary.recommendations));

  if (isHealthReport) {
    return (
      <div className="space-y-6">
        <div className="card">
          <div className="flex items-center mb-4">
            <FileText className="h-6 w-6 text-primary mr-2" />
            <h3 className="text-lg font-semibold">Report Summary</h3>
          </div>
          <p className="text-gray-700 whitespace-pre-line">{summary.summary || 'No summary provided.'}</p>
        </div>

        {summary.abnormalities && (
          <div className="card border-l-4 border-l-orange-400 bg-orange-50">
            <div className="flex items-center mb-2">
              <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
              <h3 className="text-lg font-semibold text-orange-800">Abnormalities</h3>
            </div>
            <p className="text-orange-700 whitespace-pre-line">{summary.abnormalities}</p>
          </div>
        )}

        {summary.recommendations && (
          <div className="card">
            <h3 className="text-lg font-semibold mb-2">Recommendations</h3>
            <p className="text-gray-700 whitespace-pre-line">{summary.recommendations}</p>
          </div>
        )}

        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-sm text-red-700">
            <strong>Medical Disclaimer:</strong> This AI-generated summary is for informational purposes only.
            Always consult qualified healthcare professionals for medical advice and diagnosis.
          </p>
        </div>
      </div>
    );
  }

  // Default prescription view
  return (
    <div className="space-y-6">
      <div className="card">
        <div className="flex items-center mb-4">
          <Pill className="h-6 w-6 text-primary mr-2" />
          <h3 className="text-lg font-semibold">Medication Details</h3>
        </div>
        <div className="space-y-3">
          <div>
            <span className="font-medium">Drug Name:</span>
            <span className="ml-2">{summary.drugName || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium">Dosage:</span>
            <span className="ml-2">{summary.dosage || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium">Frequency:</span>
            <span className="ml-2">{summary.frequency || 'Not specified'}</span>
          </div>
          <div>
            <span className="font-medium">Duration:</span>
            <span className="ml-2">{summary.duration || 'Not specified'}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="flex items-center mb-4">
          <FileText className="h-6 w-6 text-secondary mr-2" />
          <h3 className="text-lg font-semibold">Instructions</h3>
        </div>
        <p className="text-gray-700">{summary.instructions || 'No specific instructions provided.'}</p>
      </div>

      {summary.warnings && (
        <div className="card border-l-4 border-l-orange-400 bg-orange-50">
          <div className="flex items-center mb-4">
            <AlertTriangle className="h-6 w-6 text-orange-600 mr-2" />
            <h3 className="text-lg font-semibold text-orange-800">Important Warnings</h3>
          </div>
          <p className="text-orange-700">{summary.warnings}</p>
        </div>
      )}

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-sm text-red-700">
          <strong>Medical Disclaimer:</strong> This AI-generated summary is for informational purposes only. 
          Always follow your doctor's instructions and consult healthcare professionals for medical advice.
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
