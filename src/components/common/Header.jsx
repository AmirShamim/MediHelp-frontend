import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import BrandLogo from './BrandLogo';
import { Home, FileText, History, Info, HelpCircle } from 'lucide-react';

const Header = () => {
  const [open, setOpen] = useState(false);

  const linkBase = 'block px-4 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300';
  const active = 'bg-brand text-white shadow-md';
  const inactive = 'text-gray-700 hover:text-brand hover:bg-brand-fade/80';

  const links = [
    { to: '/', label: 'Home', icon: Home },
    { to: '/summarize', label: 'Summarize', icon: FileText },
    { to: '/history', label: 'History', icon: History },
    { to: '/about', label: 'About', icon: Info },
    { to: '/help', label: 'Help', icon: HelpCircle },
  ];

  const location = useLocation();
  return (
  <header className="glass-header sticky top-0 z-30 shadow-lg w-full">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-5">
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <BrandLogo />
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-2 flex-shrink-0" aria-label="Primary">{links.map(l => {
              const Icon = l.icon;
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  className={({isActive}) => `${linkBase} ${isActive ? active : inactive} flex items-center gap-2`}
                  aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                >
                  <Icon className="h-4 w-4 lucide" />
                  {l.label}
                </NavLink>
              );
            })}
          </nav>
          {/* Mobile button */}
          <button aria-label="Toggle navigation" onClick={() => setOpen(o=>!o)} className="md:hidden inline-flex items-center justify-center p-3 rounded-lg border-2 border-brand text-brand hover:bg-brand hover:text-white transition-all shadow-sm">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {location.pathname === '/' && (
        <h1 className="visually-hidden">MediHelp - Understand medical documents easily</h1>
      )}
      {/* Mobile panel */}
      {open && (
        <div className="md:hidden glass border-t border-white/40 shadow-xl" role="dialog" aria-label="Mobile navigation" aria-modal="true">
          <div className="px-4 py-4 space-y-2">
            {links.map(l => {
              const Icon = l.icon;
              return (
                <NavLink
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className={({isActive}) => `${linkBase} ${isActive ? active : inactive} flex items-center gap-3`}
                  aria-current={({ isActive }) => (isActive ? 'page' : undefined)}
                >
                  <Icon className="h-5 w-5 lucide" />
                  {l.label}
                </NavLink>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;