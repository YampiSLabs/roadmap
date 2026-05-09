import { Suspense, lazy } from 'react';
import { AppShell } from './components/layout/AppShell';
import { Hero } from './components/layout/Hero';
import { About } from './components/layout/About';
import { TechMarqueeCTA } from './components/sections/TechMarqueeCTA';
import { RoadmapTimeline } from './components/roadmap/RoadmapTimeline';
import { SkillMatrix } from './components/skills/SkillMatrix';
import { BeforeNow } from './components/roadmap/BeforeNow';

const SkillEvolutionChart = lazy(() =>
  import('./components/skills/SkillEvolutionChart').then((module) => ({
    default: module.SkillEvolutionChart,
  })),
);

const JSONInspector = lazy(() =>
  import('./components/roadmap/JSONInspector').then((module) => ({
    default: module.JSONInspector,
  })),
);

const LoadingPanel = ({ text }: { text: string }) => (
  <div className="glass-panel top-divider p-4 motion-reduce:animate-none sm:p-5" role="status" aria-live="polite">
    <p className="text-sm text-zinc-300">{text}</p>
  </div>
);

function App() {
  return (
    <AppShell>
      <div className="dashboard-shell space-y-4">
        <Hero />
        <TechMarqueeCTA />

        <div className="grid gap-4 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,0.9fr)] 2xl:grid-cols-[minmax(0,1.35fr)_minmax(0,0.85fr)]">
          <RoadmapTimeline />
          <div className="space-y-4">
            <SkillMatrix />
            <Suspense fallback={<LoadingPanel text="Cargando grafico de evolucion..." />}>
              <SkillEvolutionChart />
            </Suspense>
          </div>
        </div>

        <BeforeNow />
        <Suspense fallback={<LoadingPanel text="Cargando inspector de datos..." />}>
          <JSONInspector />
        </Suspense>
        <About />
      </div>
    </AppShell>
  );
}

export default App;
