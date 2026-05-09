import { useCallback, useEffect, useId, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  ArrowDownUp,
  Braces,
  Code2,
  FilterX,
  Layers3,
  Milestone,
  Server,
  ShieldCheck,
  ShoppingCart,
  Sparkles,
  X,
} from 'lucide-react';
import { getRoadmap } from '../../lib/data';
import type { RoadmapEvent } from '../../schemas/roadmap';

type SortDirection = 'asc' | 'desc';

const STATUS_META: Record<RoadmapEvent['status'], { label: string; className: string }> = {
  historical: {
    label: 'Historico',
    className: 'border-zinc-500/35 bg-zinc-500/15 text-zinc-200',
  },
  active: {
    label: 'Activo',
    className: 'border-emerald-400/45 bg-emerald-400/15 text-emerald-200',
  },
  consolidating: {
    label: 'Consolidando',
    className: 'border-sky-400/40 bg-sky-400/14 text-sky-100',
  },
  exploring: {
    label: 'Explorando',
    className: 'border-amber-300/45 bg-amber-300/14 text-amber-100',
  },
};

const CATEGORY_META: Record<string, { label: string; cardClass: string; dotClass: string }> = {
  foundation: {
    label: 'Fundacion',
    cardClass: 'border-slate-300/22',
    dotClass: 'bg-slate-300',
  },
  security: {
    label: 'Seguridad',
    cardClass: 'border-violet-300/26',
    dotClass: 'bg-violet-300',
  },
  devops: {
    label: 'DevOps',
    cardClass: 'border-blue-300/26',
    dotClass: 'bg-blue-300',
  },
  'web-classic': {
    label: 'Web clasica',
    cardClass: 'border-zinc-300/22',
    dotClass: 'bg-zinc-300',
  },
  'cms-ecommerce': {
    label: 'CMS / Ecommerce',
    cardClass: 'border-cyan-300/24',
    dotClass: 'bg-cyan-300',
  },
  frontend: {
    label: 'Frontend',
    cardClass: 'border-teal-300/28',
    dotClass: 'bg-teal-300',
  },
  backend: {
    label: 'Backend',
    cardClass: 'border-indigo-300/28',
    dotClass: 'bg-indigo-300',
  },
  automation: {
    label: 'Automatizacion',
    cardClass: 'border-fuchsia-300/26',
    dotClass: 'bg-fuchsia-300',
  },
  'ai-llm': {
    label: 'IA / LLM',
    cardClass: 'border-amber-300/30',
    dotClass: 'bg-amber-300',
  },
};

const getCategoryMeta = (category: string) => {
  return (
    CATEGORY_META[category] ?? {
      label: category.replace(/-/g, ' '),
      cardClass: 'border-white/15',
      dotClass: 'bg-zinc-300',
    }
  );
};

const getRoadmapTechGlyph = (category: string) => {
  const glyphByCategory = {
    foundation: Layers3,
    security: ShieldCheck,
    devops: Server,
    'web-classic': Braces,
    'cms-ecommerce': ShoppingCart,
    frontend: Code2,
    backend: Server,
    automation: Sparkles,
    'ai-llm': Sparkles,
  } as const;

  return glyphByCategory[category as keyof typeof glyphByCategory] ?? Braces;
};

export const RoadmapTimeline = () => {
  const roadmap = getRoadmap();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null);
  const dialogTitleId = useId();
  const dialogDescriptionId = useId();

  const categoryOptions = useMemo(() => {
    return ['all', ...Array.from(new Set(roadmap.map((event) => event.category)))];
  }, [roadmap]);

  const visibleEvents = useMemo(() => {
    const filteredEvents =
      selectedCategory === 'all'
        ? roadmap
        : roadmap.filter((event) => event.category === selectedCategory);

    const sortedEvents = [...filteredEvents].sort((a, b) => {
      if (a.year === b.year) {
        return sortDirection === 'desc'
          ? b.period.localeCompare(a.period)
          : a.period.localeCompare(b.period);
      }

      return sortDirection === 'desc' ? b.year - a.year : a.year - b.year;
    });

    return sortedEvents;
  }, [roadmap, selectedCategory, sortDirection]);

  const selectedEvent = useMemo(() => {
    return roadmap.find((event) => event.id === selectedEventId) ?? null;
  }, [roadmap, selectedEventId]);

  const closeDetail = useCallback(() => {
    setSelectedEventId(null);
    requestAnimationFrame(() => {
      triggerButtonRef.current?.focus();
    });
  }, []);

  useEffect(() => {
    if (!selectedEvent) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        closeDetail();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [closeDetail, selectedEvent]);

  const sortLabel = sortDirection === 'desc' ? 'Mas reciente primero' : 'Mas antiguo primero';

  return (
    <section
      id="timeline"
      className="section-reveal glass-panel top-divider p-4 motion-reduce:animate-none sm:p-5"
      aria-labelledby="timeline-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="timeline-title" className="panel-title flex items-center gap-2">
            <Milestone size={15} className="text-cyan-300" aria-hidden="true" />
            Mi roadmap de aprendizaje
          </h2>
          <p className="mt-1 text-xs text-zinc-400">
            {visibleEvents.length} etapas · {sortLabel}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setSortDirection((current) => (current === 'desc' ? 'asc' : 'desc'))}
            className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/12 bg-white/3 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-white/24 hover:bg-white/7 motion-reduce:transition-none"
          >
            <ArrowDownUp size={14} aria-hidden="true" />
            Ordenar
          </button>

          {selectedCategory !== 'all' && (
            <button
              type="button"
              onClick={() => setSelectedCategory('all')}
              className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/12 bg-transparent px-3 py-2 text-xs font-semibold text-zinc-300 transition hover:border-white/24 hover:text-zinc-100 motion-reduce:transition-none"
            >
              <FilterX size={14} aria-hidden="true" />
              Limpiar filtros
            </button>
          )}
        </div>
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible">
        {categoryOptions.map((category) => {
          const isActive = selectedCategory === category;
          const categoryLabel =
            category === 'all' ? 'Todas las categorias' : getCategoryMeta(category).label;

          return (
            <button
              key={category}
              type="button"
              aria-pressed={isActive}
              onClick={() => setSelectedCategory(category)}
              className={`inline-flex min-h-10 shrink-0 items-center rounded-full border px-3 py-2 text-xs font-semibold transition motion-reduce:transition-none ${
                isActive
                  ? 'border-teal-300/36 bg-teal-400/14 text-teal-100'
                  : 'border-white/10 bg-white/3 text-zinc-300 hover:border-white/20 hover:text-zinc-100'
              }`}
            >
              {categoryLabel}
            </button>
          );
        })}
      </div>

      {visibleEvents.length === 0 ? (
        <div className="mt-4 rounded-xl border border-dashed border-white/20 bg-[#131b26]/80 p-4">
          <h3 className="text-sm font-semibold text-zinc-100">Sin etapas para este filtro</h3>
          <p className="mt-1 text-sm text-zinc-300/90">
            Prueba otra categoria o limpia filtros para ver el roadmap completo.
          </p>
          <button
            type="button"
            onClick={() => setSelectedCategory('all')}
            className="mt-3 inline-flex min-h-10 items-center rounded-md border border-white/15 px-3 py-2 text-xs font-semibold text-zinc-200 transition hover:border-white/28 hover:bg-white/6 motion-reduce:transition-none"
          >
            Ver todas las etapas
          </button>
        </div>
      ) : (
        <ol className="relative mt-4 space-y-3 pl-0.5 sm:pl-0">
          <div className="pointer-events-none absolute bottom-4 left-[6.35rem] top-4 hidden w-px bg-white/12 lg:block" />

          {visibleEvents.map((event) => {
            const status = STATUS_META[event.status];
            const category = getCategoryMeta(event.category);
            const CategoryGlyph = getRoadmapTechGlyph(event.category);

            return (
              <li key={event.id} className="grid gap-2 lg:grid-cols-[96px_22px_minmax(0,1fr)] lg:items-start">
                <div className="pt-1 lg:pt-3 lg:text-right">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.08em] text-zinc-500">
                    {event.year}
                  </p>
                  <p className="text-xs text-zinc-400">{event.period}</p>
                </div>

                <div className="relative hidden justify-center lg:flex lg:pt-4">
                  <span
                    aria-hidden="true"
                    className={`h-3.5 w-3.5 rounded-full border-2 border-[#0d1219] ${category.dotClass}`}
                  />
                </div>

                <article
                  className={`rounded-xl border bg-[#161d28]/92 px-4 py-3 transition hover:border-white/22 hover:bg-[#192231]/94 motion-reduce:transition-none ${category.cardClass}`}
                >
                  <div className="flex flex-wrap items-center gap-2 text-xs text-zinc-300">
                    <span className="rounded-full border border-white/14 bg-white/4 px-2 py-0.5 font-semibold text-zinc-200">
                      {category.label}
                    </span>
                    <span className={`rounded-full border px-2 py-0.5 font-semibold ${status.className}`}>
                      {status.label}
                    </span>
                  </div>

                  <h3 className="mt-2 flex items-center gap-2 text-lg leading-tight text-zinc-100">
                    <Milestone size={14} className="text-teal-300" aria-hidden="true" />
                    {event.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-zinc-300/95">{event.summary}</p>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {event.technologies.map((tech) => (
                      <span
                        key={`${event.id}-${tech}`}
                        className="inline-flex items-center gap-1.5 rounded-md border border-white/12 bg-white/3 px-2 py-1 text-[11px] font-medium text-zinc-200"
                      >
                        <CategoryGlyph size={11} className="text-zinc-400" aria-hidden="true" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                    <p className="text-xs text-zinc-400">{event.currentRelevance}</p>
                    <button
                      type="button"
                      onClick={(clickEvent) => {
                        triggerButtonRef.current = clickEvent.currentTarget;
                        setSelectedEventId(event.id);
                      }}
                      className="inline-flex min-h-10 items-center rounded-md border border-white/14 bg-white/3 px-3 py-2 text-xs font-semibold text-zinc-100 transition hover:border-white/26 hover:bg-white/8 motion-reduce:transition-none"
                    >
                      Ver detalle
                    </button>
                  </div>
                </article>
              </li>
            );
          })}
        </ol>
      )}

      {selectedEvent && typeof document !== 'undefined' &&
        createPortal(
          <div
            className="fixed inset-0 z-70 flex items-center justify-center bg-[#05080fcc] p-2 backdrop-blur-sm sm:p-6"
            onMouseDown={(event) => {
              if (event.target === event.currentTarget) {
                closeDetail();
              }
            }}
          >
            <div
              role="dialog"
              aria-modal="true"
              aria-labelledby={dialogTitleId}
              aria-describedby={dialogDescriptionId}
              className="flex max-h-[86vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/12 bg-[#101824] shadow-[0_24px_60px_-28px_rgba(0,0,0,0.85)]"
            >
              <div className="flex items-start justify-between gap-3 border-b border-white/10 p-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.08em] text-zinc-400">
                    {selectedEvent.period} · {getCategoryMeta(selectedEvent.category).label}
                  </p>
                  <h3 id={dialogTitleId} className="mt-1 text-xl leading-tight text-zinc-50 sm:text-2xl">
                    {selectedEvent.title}
                  </h3>
                </div>

                <button
                  ref={closeButtonRef}
                  type="button"
                  onClick={closeDetail}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/14 bg-white/4 text-zinc-200 transition hover:border-white/28 hover:text-white motion-reduce:transition-none"
                  aria-label="Cerrar detalle"
                >
                  <X size={16} aria-hidden="true" />
                </button>
              </div>

              <div id={dialogDescriptionId} className="space-y-4 overflow-y-auto p-4 sm:p-5">
                <p className="text-sm leading-6 text-zinc-100 sm:text-[0.95rem]">{selectedEvent.summary}</p>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div className="rounded-lg border border-white/10 bg-white/2 p-3">
                    <h4 className="text-sm font-semibold text-zinc-100">Contexto</h4>
                    <p className="mt-1 text-sm leading-6 text-zinc-200">{selectedEvent.context}</p>
                  </div>
                  <div className="rounded-lg border border-white/10 bg-white/2 p-3">
                    <h4 className="text-sm font-semibold text-zinc-100">Relevancia actual</h4>
                    <p className="mt-1 text-sm leading-6 text-zinc-200">{selectedEvent.currentRelevance}</p>
                  </div>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/2 p-3">
                  <h4 className="text-sm font-semibold text-zinc-100">Lo aprendido</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-200">
                    {selectedEvent.learned.map((item) => (
                      <li key={`${selectedEvent.id}-learned-${item}`}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-lg border border-white/10 bg-white/2 p-3">
                  <h4 className="text-sm font-semibold text-zinc-100">Evidencia</h4>
                  <ul className="mt-2 list-disc space-y-1 pl-5 text-sm text-zinc-200">
                    {selectedEvent.evidence.map((item) => (
                      <li key={`${selectedEvent.id}-evidence-${item}`}>{item}</li>
                    ))}
                  </ul>
                </div>

                <blockquote className="rounded-lg border-l-2 border-teal-300/45 bg-[#102332]/45 p-3 text-sm italic leading-6 text-zinc-100">
                  "{selectedEvent.tone}"
                </blockquote>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </section>
  );
};
