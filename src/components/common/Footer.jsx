import React from 'react';
import BrandLogo from './BrandLogo';

const Footer = () => {
  return (
  <footer className="mt-12 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-gray-300 border-t border-gray-800/70 relative overflow-hidden footer-stack w-full">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_60%_20%,rgba(0,180,216,0.25),transparent_70%)]" />
      <div className="w-full max-w-7xl mx-auto py-10 sm:py-14 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-6 sm:space-y-8">
          <div className="flex items-center justify-center mb-4">
            <BrandLogo size="lg" />
          </div>
          <p className="text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed text-sm px-4">
            © 2025 MediHelp. Empowering patients with AI-powered prescription & health report understanding.
          </p>
          <div className="w-full flex justify-center px-4">
            <div className="inline-block bg-gradient-to-br from-red-900/30 to-orange-900/20 border border-red-500/30 rounded-xl px-5 py-4 sm:px-6 sm:py-5 max-w-2xl backdrop-blur-sm text-left sm:text-center">
              <p className="text-[12px] sm:text-[13px] text-red-200 font-medium flex items-start sm:items-center justify-start sm:justify-center gap-2 leading-relaxed">
                <span className="text-lg flex-shrink-0">⚠️</span>
                <span>AI summaries do not replace professional medical advice. Always consult a qualified doctor for clinical decisions.</span>
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-[11px] sm:text-[12px] text-gray-500 pt-1 sm:pt-2 px-4">
            <span className="flex items-center gap-1">Made with <span className="animate-pulse">❤️</span> for better healthcare</span>
            <span className="hidden sm:inline-block w-px h-4 bg-gray-700" />
            <span>Privacy-first · Local storage history</span>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary-500/40 to-transparent" />
    </footer>
  );
};

export default Footer;