import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-gray-600">
            © 2025 MediSummarize. This tool is for educational purposes only.
          </p>
          <p className="text-sm text-red-600 mt-2">
            ⚠️ Not a substitute for professional medical advice. Always consult your doctor.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;