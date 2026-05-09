import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { BarChart3 } from 'lucide-react';
import { getRoadmap } from '../../lib/data';

export const SkillEvolutionChart: React.FC = () => {
  const reducedMotion =
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const data = getRoadmap().map((event) => ({
    label: event.period.replace('20', '').replace('-', '-').slice(0, 6),
    tecnologias: event.technologies.length,
    year: event.year,
  }));

  return (
    <section className="section-reveal glass-panel top-divider p-4 motion-reduce:animate-none sm:p-5">
      <h2 className="panel-title mb-3 flex items-center gap-2">
        <BarChart3 size={15} className="text-sky-300" aria-hidden="true" />
        Tecnologias aprendidas por etapa
      </h2>
      <p className="mb-3 text-xs text-zinc-400">Lectura rapida de volumen tecnico por etapa.</p>
      <div className="h-52 w-full" role="img" aria-label="Grafico de barras con tecnologias por etapa">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} barCategoryGap={10}>
            <XAxis
              dataKey="label"
              stroke="#6b7280"
              tick={{ fill: '#a1a1aa', fontSize: 11 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              stroke="#6b7280"
              tick={{ fill: '#a1a1aa', fontSize: 11 }}
              width={22}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              cursor={{ fill: 'rgba(255,255,255,0.06)' }}
              contentStyle={{
                backgroundColor: '#16202d',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 10,
                color: '#e5e7eb',
              }}
            />
            <Bar
              dataKey="tecnologias"
              fill="url(#barGlow)"
              radius={[6, 6, 2, 2]}
              animationDuration={reducedMotion ? 0 : 850}
            />
            <defs>
              <linearGradient id="barGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#5eead4" />
                <stop offset="100%" stopColor="#14b8a6" />
              </linearGradient>
            </defs>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};
