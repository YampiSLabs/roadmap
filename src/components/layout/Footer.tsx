import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="theme-footer border-t py-4">
      <div className="dashboard-shell flex flex-col items-center justify-between gap-3 text-xs text-zinc-400 md:flex-row">
        <p className="text-zinc-500">Roadmap tecnico versionado para seguimiento y mejora continua.</p>
        <span className="text-zinc-500">© {new Date().getFullYear()} Yampi. All rights reserved.</span>
      </div>
    </footer>
  );
};
