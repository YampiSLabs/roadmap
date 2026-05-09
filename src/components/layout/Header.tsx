import React, { useEffect, useMemo, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

type ThemeName = 'dark' | 'neon';

const THEME_STORAGE_KEY = 'roadmap-theme';

const getInitialTheme = (): ThemeName => {
  if (typeof window === 'undefined') {
    return 'dark';
  }

  const storedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
  return storedTheme === 'neon' ? 'neon' : 'dark';
};

export const Header: React.FC = () => {
  const links = useMemo(
    () => [
      { id: 'timeline', href: '#timeline', label: 'Timeline' },
      { id: 'skills', href: '#skills', label: 'Skills' },
      { id: 'before-now', href: '#before-now', label: 'Before / Now' },
      { id: 'data', href: '#data', label: 'Data' },
      { id: 'about', href: '#about', label: 'About' },
    ],
    [],
  );

  const [activeSection, setActiveSection] = useState<string>('timeline');
  const [theme, setTheme] = useState<ThemeName>(getInitialTheme);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    const sections = links
      .map((link) => document.getElementById(link.id))
      .filter((section): section is HTMLElement => Boolean(section));

    if (!sections.length) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry?.target.id) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: '-44% 0px -44% 0px',
        threshold: [0.2, 0.45, 0.7],
      },
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
    };
  }, [links]);

  return (
    <header className="theme-surface-header sticky top-0 z-50 w-full border-b backdrop-blur-lg">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-2 focus:z-60 focus:rounded-md focus:bg-[#0d1520] focus:px-3 focus:py-2 focus:text-xs focus:font-semibold"
      >
        Saltar al contenido principal
      </a>

      <div className="dashboard-shell py-2">
        <div className="flex h-10 items-center justify-between gap-3">
          <a
            href="#inicio"
            className="text-sm font-semibold text-zinc-100 transition hover:text-white sm:text-base"
          >
            Yampi Dev Roadmap
          </a>

          <button
            className="theme-icon-button inline-flex h-10 w-10 items-center justify-center rounded-full border transition motion-reduce:transition-none"
            aria-label={theme === 'dark' ? 'Cambiar al tema neon' : 'Cambiar al tema oscuro'}
            aria-pressed={theme !== 'dark'}
            title={theme === 'dark' ? 'Cambiar al tema neon' : 'Cambiar al tema oscuro'}
            type="button"
            onClick={() => setTheme((currentTheme) => (currentTheme === 'dark' ? 'neon' : 'dark'))}
          >
            {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
          </button>
        </div>

        <nav
          aria-label="Navegacion principal"
          className="mt-2 flex gap-2 overflow-x-auto pb-1 scrollbar-thin [scrollbar-color:rgba(148,163,184,0.35)_transparent]"
        >
          {links.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex min-h-10 shrink-0 items-center rounded-md border px-3 py-2 text-xs font-semibold tracking-wide transition motion-reduce:transition-none ${
                  isActive
                    ? 'border-teal-300/35 bg-teal-400/15 text-teal-100'
                    : 'border-white/10 bg-white/2 text-zinc-300 hover:border-white/20 hover:bg-white/6 hover:text-zinc-100'
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
