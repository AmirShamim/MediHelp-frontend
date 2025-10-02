import React from 'react';

const Footer = () => {
  return (
    <footer className="mt-12 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 text-gray-300 border-t border-gray-800/70 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-30 bg-[radial-gradient(circle_at_60%_20%,rgba(0,180,216,0.25),transparent_70%)]" />
      <div className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center space-y-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <span className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-2xl shadow-lg ring-2 ring-primary-400/30">
              🏥
            </span>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-primary-200 bg-clip-text text-transparent">MediHelp</h3>
          </div>
          <p className="text-gray-400 font-medium max-w-2xl mx-auto leading-relaxed text-sm">
            © 2025 MediHelp. Empowering patients with AI-powered prescription & health report understanding.
          </p>
          <div className="inline-block bg-gradient-to-br from-red-900/30 to-orange-900/20 border border-red-500/30 rounded-xl px-6 py-5 max-w-2xl backdrop-blur-sm">
            <p className="text-[13px] text-red-200 font-medium flex items-center justify-center gap-2 leading-relaxed">
              <span className="text-lg">⚠️</span>
              <span>AI summaries do not replace professional medical advice. Always consult a qualified doctor for clinical decisions.</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 text-[12px] text-gray-500 pt-2">
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