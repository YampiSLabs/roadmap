import { TechnologyIcon } from '../ui/TechnologyIcon';
import { hasTechnologyIcon } from '../ui/technologyIcons';

const TECH_STACK = [
  'React',
  'Astro',
  'Next.js',
  'Tailwind',
  'WordPress',
  'WooCommerce',
  'Django',
  'Supabase',
  'PostgreSQL',
  'n8n',
  'Playwright',
  'Codex',
  'Gemini CLI',
  'GitHub',
  'Cloudflare',
] as const;

const TECH_STACK_WITH_ICON = TECH_STACK.filter(hasTechnologyIcon);

const MarqueeLine = ({ duplicate = false }: { duplicate?: boolean }) => {
  return (
    <div
      aria-hidden={duplicate ? 'true' : undefined}
      className="marquee-content flex min-w-full shrink-0 items-center justify-center gap-8 whitespace-nowrap px-6"
    >
      {TECH_STACK_WITH_ICON.map((tech) => {
        if (duplicate) {
          return (
            <span
              key={`dup-${tech}`}
              className="inline-flex min-h-14 min-w-14 items-center justify-center px-2 py-2 sm:min-h-16 sm:min-w-16"
              role="img"
              aria-label={tech}
            >
              <TechnologyIcon name={tech} size={32} className="text-cyan-200/95" />
            </span>
          );
        }

        return (
          <a
            key={tech}
            href="#skills"
            className="group relative inline-flex min-h-14 min-w-14 items-center justify-center px-2 py-2 text-cyan-100 transition hover:text-cyan-50 focus-visible:rounded-md focus-visible:outline-2 focus-visible:outline-cyan-200/70 focus-visible:outline-offset-2 sm:min-h-16 sm:min-w-16"
            aria-label={tech}
            title={tech}
          >
            <TechnologyIcon name={tech} size={32} className="text-cyan-200/95 transition group-hover:text-cyan-100 group-focus-visible:text-cyan-100" />
            <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md border border-cyan-200/35 bg-[#0c1420]/98 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.12em] text-cyan-100 opacity-0 transition group-hover:opacity-100 group-focus-visible:opacity-100">
              {tech}
            </span>
          </a>
        );
      })}
    </div>
  );
};

export const TechMarqueeCTA = () => {
  return (
    <section aria-label="Stack y contacto" className="section-reveal motion-reduce:animate-none" id="stack-cta">
      <div className="tech-marquee-strip top-divider relative isolate min-h-20 overflow-hidden rounded-xl border border-white/10 bg-[#0f1623]/90 sm:min-h-24">
        <p className="sr-only">
          Stack actual: {TECH_STACK_WITH_ICON.join(', ')}.
        </p>

        <div className="tech-marquee-mask h-full">
          <div className="marquee-track flex h-full w-max min-w-full items-center">
            <MarqueeLine />
            <MarqueeLine duplicate />
          </div>
        </div>
      </div>
    </section>
  );
};
