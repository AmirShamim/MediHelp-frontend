import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  const [open, setOpen] = useState(false);

  const linkBase = 'block px-3 py-2 rounded text-sm font-medium transition-colors';
  const active = 'bg-brand-fade text-brand';
  const inactive = 'text-gray-600 hover:text-brand hover:bg-brand-fade/60';

  const links = [
    { to: '/', label: 'Home' },
    { to: '/summarize', label: 'Summarize' },
    { to: '/history', label: 'History' },
    { to: '/about', label: 'About' },
    { to: '/help', label: 'Help' },
  ];

  return (
  <header className="glass-header sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-brand tracking-tight">MediHelp</h1>
          </div>
          {/* Desktop nav */}
          <nav className="hidden md:flex space-x-1">
            {links.map(l => (
              <NavLink key={l.to} to={l.to} className={({isActive}) => `${linkBase} ${isActive ? 'text-brand font-semibold' : 'text-gray-600 hover:text-brand'} hover:bg-brand-fade`}>{l.label}</NavLink>
            ))}
          </nav>
          {/* Mobile button */}
          <button aria-label="Toggle navigation" onClick={() => setOpen(o=>!o)} className="md:hidden inline-flex items-center justify-center p-2 rounded border text-brand hover:bg-brand-fade transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              {open ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {/* Mobile panel */}
      {open && (
        <div className="md:hidden glass border-t border-white/40">
          <div className="px-2 py-2 space-y-1">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className={({isActive}) => `${linkBase} ${isActive ? active : inactive}`}
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;