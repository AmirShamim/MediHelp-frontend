import React from 'react';
import { Link } from 'react-router-dom';

/**
 * BrandLogo
 * - Reusable logo component (emoji placeholder -> could swap to SVG later)
 * - Accessible: aria-label on link, optional hidden text variant
 * - Reduced motion friendly (no large transforms; respects prefers-reduced-motion)
 */
const BrandLogo = ({ size = 'md', withText = true }) => {
  const sizes = {
    sm: 'h-8 w-8 text-lg',
    md: 'h-10 w-10 text-xl',
    lg: 'h-12 w-12 text-2xl'
  };
  const box = sizes[size] || sizes.md;
  return (
    <Link to="/" aria-label="MediHelp home" className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 rounded-xl">
      <span className={`logo-tile ${box} inline-flex items-center justify-center rounded-xl bg-gradient-to-br from-primary-600 to-primary-500 text-white shadow-md group-hover:shadow-lg transition-shadow`}>
        🏥
      </span>
      {withText && (
        <span className="logo-text text-2xl font-bold tracking-tight select-none text-brand">
          MediHelp
        </span>
      )}
    </Link>
  );
};

export default BrandLogo;