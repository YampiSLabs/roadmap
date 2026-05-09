import { ArrowRight, Braces, Code2, Sparkles, Target } from 'lucide-react';
import { getProfile, getRoadmap } from '../../lib/data';
import { TechnologyIcon } from '../ui/TechnologyIcon';

export const Hero = () => {
  const profile = getProfile();
  const roadmap = getRoadmap();
  const currentFocus = roadmap[roadmap.length - 1];

  const stack = Array.from(
    new Set([...profile.stack, ...currentFocus.technologies]),
  ).slice(0, 12);

  return (
    <section id="inicio" className="section-reveal py-2 motion-reduce:animate-none sm:py-4">
      <div className="glass-panel top-divider overflow-hidden p-4 sm:p-6 lg:p-7">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.18fr)_minmax(0,0.82fr)] lg:items-start">
          <div>
            <p className="panel-title mb-2">Developer Roadmap</p>
            <h1 className="max-w-3xl text-3xl leading-[1.12] text-zinc-100 sm:text-4xl lg:text-[2.7rem]">
              De sistemas a productos,
              <br />
              de codigo a soluciones.
            </h1>
            <p className="mt-4 max-w-xl text-[0.97rem] leading-7 text-zinc-300/90">{profile.summary}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              <a
                href="#timeline"
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-teal-200/30 bg-teal-400/14 px-4 py-2 text-sm font-semibold text-teal-100 transition hover:bg-teal-400/22 motion-reduce:transition-none"
              >
                Ver timeline <ArrowRight size={14} />
              </a>
              <a
                href="#skills"
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/14 bg-white/4 px-4 py-2 text-sm font-semibold text-zinc-200 transition hover:border-white/24 hover:bg-white/8 motion-reduce:transition-none"
              >
                <Code2 size={14} /> Ver stack actual
              </a>
              <a
                href="#data"
                className="inline-flex min-h-10 items-center gap-2 rounded-md border border-white/12 bg-transparent px-4 py-2 text-sm font-semibold text-zinc-300 transition hover:border-white/24 hover:text-zinc-100 motion-reduce:transition-none"
              >
                <Braces size={14} /> Ver JSON
              </a>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <div className="rounded-xl border border-white/10 bg-[#101723]/76 p-4">
              <p className="panel-title mb-3 flex items-center gap-2">
                <Sparkles size={14} className="text-amber-300" aria-hidden="true" />
                Stack Actual
              </p>
              <div className="flex flex-wrap gap-2">
                {stack.map((tech) => (
                  <span
                    key={tech}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/12 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-200"
                  >
                    <TechnologyIcon name={tech} size={11} className="text-zinc-400" />
                    {tech}
                  </span>
                ))}
              </div>
              <p className="mt-3 text-xs text-zinc-400">Stack en movimiento, criterio estable.</p>
            </div>

            <div className="rounded-xl border border-white/10 bg-[#111824]/76 p-4">
              <p className="flex items-center gap-2 text-sm font-semibold text-zinc-200">
                <Target size={14} className="text-teal-300" aria-hidden="true" />
                Enfoque actual
              </p>
              <p className="mt-2 text-sm leading-6 text-zinc-300/95">
                Construyendo productos web reales, automatizando procesos y aplicando IA para multiplicar impacto.
              </p>
              <p className="mt-4 text-xs uppercase tracking-[0.08em] text-zinc-400">Calma, claridad y consistencia en cada entrega.</p>
              <p className="mt-2 text-xs text-zinc-500">{currentFocus.period} · {currentFocus.category}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
