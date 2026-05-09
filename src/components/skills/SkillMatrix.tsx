import { getSkillGroups } from '../../lib/data';

import { Layers3, Sparkles } from 'lucide-react';
import { TechnologyIcon } from '../ui/TechnologyIcon';

export const SkillMatrix = () => {
  const skillGroups = getSkillGroups();
  const supportGroups = [
    {
      group: 'CMS / Ecommerce',
      skills: [
        {
          name: 'WordPress',
          level: 'avanzado',
          status: 'activo',
          evidence: 'Proyectos para cliente y mantenimiento',
        },
        {
          name: 'WooCommerce',
          level: 'avanzado',
          status: 'activo',
          evidence: 'Ecommerce operativo en produccion',
        },
        {
          name: 'Elementor',
          level: 'practico',
          status: 'consolidando',
          evidence: 'Landing pages y ajustes de diseño',
        },
        {
          name: 'PrestaShop',
          level: 'practico',
          status: 'historico',
          evidence: 'Implementaciones y soporte',
        },
      ],
    },
    {
      group: 'DevOps',
      skills: [
        {
          name: 'Docker',
          level: 'practico',
          status: 'consolidando',
          evidence: 'Entornos de desarrollo reproducibles',
        },
        {
          name: 'Proxmox',
          level: 'practico',
          status: 'historico',
          evidence: 'Virtualizacion en infraestructura propia',
        },
        {
          name: 'Cloudflare',
          level: 'solido',
          status: 'activo',
          evidence: 'DNS, edge y seguridad basica',
        },
        {
          name: 'DNS',
          level: 'solido',
          status: 'activo',
          evidence: 'Resolucion y troubleshooting continuo',
        },
        {
          name: 'GitHub Pages',
          level: 'solido',
          status: 'activo',
          evidence: 'Deploy estatico de portfolio tecnico',
        },
      ],
    },
    {
      group: 'QA / Producto',
      skills: [
        {
          name: 'Playwright',
          level: 'practico',
          status: 'activo',
          evidence: 'Checks de regresion y smoke tests',
        },
        {
          name: 'QA funcional',
          level: 'avanzado',
          status: 'activo',
          evidence: 'Flujos y casos reales en produccion',
        },
        {
          name: 'Accesibilidad',
          level: 'solido',
          status: 'consolidando',
          evidence: 'Auditorias UX y revisiones WCAG',
        },
        {
          name: 'UX',
          level: 'solido',
          status: 'activo',
          evidence: 'Decisiones basadas en claridad y tareas',
        },
      ],
    },
  ];

  const groups = [...skillGroups, ...supportGroups];

  const levelLabel: Record<string, string> = {
    base: 'base',
    practico: 'practico',
    solido: 'solido',
    avanzado: 'avanzado',
    explorando: 'explorando',
  };

  const levelClass: Record<string, string> = {
    base: 'border-zinc-500/35 bg-zinc-500/12 text-zinc-200',
    practico: 'border-sky-300/35 bg-sky-300/12 text-sky-100',
    solido: 'border-teal-300/35 bg-teal-300/12 text-teal-100',
    avanzado: 'border-emerald-300/40 bg-emerald-300/14 text-emerald-100',
    explorando: 'border-amber-300/38 bg-amber-300/12 text-amber-100',
  };

  const statusLabel: Record<string, string> = {
    historico: 'historico',
    activo: 'activo',
    consolidando: 'consolidando',
    explorando: 'explorando',
  };

  return (
    <section
      id="skills"
      className="section-reveal glass-panel top-divider p-4 motion-reduce:animate-none sm:p-5"
      aria-labelledby="skills-title"
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h2 id="skills-title" className="panel-title flex items-center gap-2">
          <Sparkles size={15} className="text-emerald-300" aria-hidden="true" />
          Matriz de habilidades
        </h2>
        <p className="text-xs text-zinc-400">{groups.length} grupos de skills</p>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {groups.map((group, index) => (
          <article key={group.group} className="rounded-xl border border-white/10 bg-[#151c27]/88 p-3.5">
            <h3 className="mb-3 flex items-center gap-2 text-sm font-semibold text-zinc-100">
              <Layers3
                size={14}
                className={
                  index % 3 === 0
                    ? 'text-cyan-300'
                    : index % 3 === 1
                      ? 'text-amber-300'
                      : 'text-teal-300'
                }
                aria-hidden="true"
              />
              {group.group}
            </h3>
            <div className="space-y-2">
              {group.skills.map((skill) => (
                <div key={skill.name} className="rounded-lg border border-white/9 bg-white/2 p-2.5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-200">
                      <TechnologyIcon name={skill.name} size={13} className="text-zinc-400" />
                      {skill.name}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold uppercase tracking-[0.04em] ${levelClass[skill.level]}`}
                    >
                      {levelLabel[skill.level]}
                    </span>
                  </div>

                  <p className="mt-1 text-xs leading-5 text-zinc-400">
                    Estado: {statusLabel[skill.status]} · Evidencia: {skill.evidence}
                  </p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
