import React, { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 640);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const scrollToTop = () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  };

  return (
    <div className="relative flex min-h-screen flex-col overflow-x-clip text-zinc-100">
      <div className="app-shell-glow pointer-events-none absolute inset-0 -z-10" />
      <Header />
      <main id="main-content" className="grow py-6 sm:py-8">
        {children}
      </main>

      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="theme-floating-button fixed bottom-4 right-3 z-40 inline-flex min-h-11 items-center gap-1 rounded-full border px-3 py-2 text-xs font-semibold text-zinc-100 shadow-lg transition motion-reduce:transition-none sm:right-4"
          aria-label="Volver arriba"
        >
          <ArrowUp size={14} aria-hidden="true" />
          Volver arriba
        </button>
      )}

      <Footer />
    </div>
  );
};
