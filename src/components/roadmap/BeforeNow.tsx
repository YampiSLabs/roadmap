import { ArrowDown, ArrowRight } from 'lucide-react';

export const BeforeNow = () => {
  const before = [
    'Soporte IT y microsistemas',
    'Redes y sistemas',
    'Proxmox y virtualizacion',
    'Java 8, Angular 6',
    'PHP / WordPress clasico',
    'PrestaShop',
  ];

  const now = [
    'React, Astro, Next.js, Tailwind',
    'Django, Supabase, PostgreSQL',
    'WooCommerce y producto real',
    'n8n, automatizaciones',
    'Codex, Gemini CLI, agentes',
    'QA con Playwright y LLMs',
  ];

  return (
    <section
      id="before-now"
      className="section-reveal glass-panel top-divider p-4 motion-reduce:animate-none sm:p-5"
      aria-labelledby="before-now-title"
    >
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 id="before-now-title" className="panel-title">Antes / Ahora</h2>
        <p className="text-xs text-zinc-400">Sintesis de evolucion tecnica</p>
      </div>

      <div className="mt-4 grid gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-stretch">
        <article className="rounded-xl border border-white/10 bg-[#141b27]/88 p-4">
          <h3 className="text-sm font-semibold text-zinc-100">Antes (2013-2019)</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {before.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>

        <div className="flex items-center justify-center rounded-xl border border-white/10 bg-[#121a24]/70 px-4 py-3 text-zinc-300">
          <ArrowRight className="hidden lg:block" size={22} aria-hidden="true" />
          <ArrowDown className="lg:hidden" size={22} aria-hidden="true" />
          <span className="sr-only">Transicion de antes a ahora</span>
        </div>

        <article className="rounded-xl border border-teal-300/25 bg-[#15212c]/88 p-4">
          <h3 className="text-sm font-semibold text-zinc-100">Ahora (2025-2026)</h3>
          <ul className="mt-3 space-y-2 text-sm text-zinc-200">
            {now.map((item) => (
              <li key={item}>• {item}</li>
            ))}
          </ul>
        </article>
      </div>

      <blockquote className="mt-4 rounded-lg border-l-2 border-teal-300/45 bg-[#102332]/45 px-4 py-3 text-sm leading-6 text-zinc-300">
        Lo anterior no desaparece: queda como criterio. Lo nuevo no es magia: es herramienta.
      </blockquote>
    </section>
  );
};
