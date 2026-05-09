import { useMemo, useState } from 'react';
import { Braces, Check, Copy, Database } from 'lucide-react';
import roadmapData from '../../data/learning-roadmap.json';
import skillGroupsData from '../../data/skill-groups.json';
import profileData from '../../data/profile.public.json';

type DataTab = 'roadmap' | 'skills' | 'profile';

const DATA: Record<DataTab, unknown> = {
  roadmap: roadmapData,
  skills: skillGroupsData,
  profile: profileData,
};

const sanitizeJsonString = (value: string) => {
  return value
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/&/g, '\\u0026');
};

export const JSONInspector = () => {
  const [activeTab, setActiveTab] = useState<DataTab>('roadmap');
  const [copyStatus, setCopyStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const labels: Record<DataTab, string> = {
    roadmap: 'Roadmap JSON',
    skills: 'Skills JSON',
    profile: 'Profile JSON',
  };

  const activeJson = useMemo(() => {
    return JSON.stringify(DATA[activeTab], null, 2);
  }, [activeTab]);

  const visibleJson = useMemo(() => {
    return sanitizeJsonString(activeJson);
  }, [activeJson]);

  const copyJson = async () => {
    try {
      if (!navigator.clipboard) {
        throw new Error('Clipboard API not available');
      }

      await navigator.clipboard.writeText(activeJson);
      setCopyStatus('success');
    } catch {
      setCopyStatus('error');
    } finally {
      window.setTimeout(() => {
        setCopyStatus('idle');
      }, 1800);
    }
  };

  return (
    <section
      id="data"
      className="section-reveal glass-panel top-divider p-4 motion-reduce:animate-none sm:p-5"
      aria-labelledby="data-title"
    >
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3">
        <h2 id="data-title" className="panel-title flex items-center gap-2">
          <Database size={15} className="text-amber-300" aria-hidden="true" />
          Data Inspector
        </h2>

        <button
          type="button"
          onClick={copyJson}
          className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/12 bg-white/3 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-white/24 hover:bg-white/7 motion-reduce:transition-none"
        >
          {copyStatus === 'success' ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
          Copiar JSON
        </button>
      </div>

      <div role="tablist" aria-label="Seleccion de fuente JSON" className="mb-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {(['roadmap', 'skills', 'profile'] as const).map((tab) => (
          <button
            key={tab}
            id={`json-tab-${tab}`}
            role="tab"
            aria-selected={activeTab === tab}
            aria-controls={`json-panel-${tab}`}
            tabIndex={activeTab === tab ? 0 : -1}
            className={`inline-flex min-h-10 shrink-0 items-center rounded-md border px-3 py-2 text-xs font-semibold transition motion-reduce:transition-none ${
              activeTab === tab
                ? 'border-white/25 bg-white/10 text-zinc-100'
                : 'border-white/10 bg-white/3 text-zinc-300 hover:border-white/20'
            }`}
            onClick={() => setActiveTab(tab)}
            type="button"
          >
            {activeTab === tab && <Braces size={13} className="mr-1 text-cyan-300" aria-hidden="true" />}
            {labels[tab]}
          </button>
        ))}
      </div>

      <p className="mb-2 text-xs text-zinc-400" aria-live="polite">
        {copyStatus === 'success' && 'Copiado'}
        {copyStatus === 'error' && 'Error al copiar'}
      </p>

      <pre
        id={`json-panel-${activeTab}`}
        role="tabpanel"
        aria-labelledby={`json-tab-${activeTab}`}
        className="max-h-96 overflow-auto rounded-xl border border-white/10 bg-[#111a27] p-4 text-xs leading-6 text-zinc-200 shadow-inner"
      >
        <code>{visibleJson}</code>
      </pre>
    </section>
  );
};
