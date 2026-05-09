import { BookOpenText, Info, Layers3, ShieldCheck } from 'lucide-react';

export const About = () => {
  return (
    <section
      id="about"
      className="section-reveal glass-panel top-divider p-4 motion-reduce:animate-none sm:p-5"
      aria-labelledby="about-title"
    >
      <h2 id="about-title" className="panel-title mb-4 flex items-center gap-2">
        <Info size={15} className="text-cyan-300" aria-hidden="true" />
        About
      </h2>

      <div className="grid gap-3 lg:grid-cols-3">
        <article className="rounded-xl border border-white/10 bg-[#151d28]/85 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
            <BookOpenText size={14} className="text-amber-300" aria-hidden="true" />
            Que es esta web
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            Un roadmap tecnico publico y versionado por etapas. Muestra decisiones de aprendizaje, foco
            actual y cambios de criterio sin adornos.
          </p>
        </article>

        <article className="rounded-xl border border-white/10 bg-[#151d28]/85 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
            <Layers3 size={14} className="text-sky-300" aria-hidden="true" />
            Como esta construida
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            React + TypeScript + Vite + Tailwind en despliegue estatico para GitHub Pages. La UI prioriza
            legibilidad, navegacion clara y mantenimiento simple.
          </p>
        </article>

        <article className="rounded-xl border border-white/10 bg-[#151d28]/85 p-4">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-zinc-100">
            <ShieldCheck size={14} className="text-emerald-300" aria-hidden="true" />
            Que demuestra
          </h3>
          <p className="mt-2 text-sm leading-6 text-zinc-300">
            Modelado de datos con JSON validado, componentes reutilizables, criterio UX y foco en entrega
            real. Menos humo, mas trazabilidad tecnica.
          </p>
        </article>
      </div>
    </section>
  );
};
