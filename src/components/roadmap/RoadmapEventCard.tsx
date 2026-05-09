import React from 'react';
import { motion } from 'framer-motion';
import type { RoadmapEvent } from '../../schemas/roadmap';

interface RoadmapEventCardProps {
  event: RoadmapEvent;
}

export const RoadmapEventCard: React.FC<RoadmapEventCardProps> = ({ event }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="rounded-lg border border-zinc-800 bg-zinc-900 p-6 shadow-sm hover:border-zinc-700 transition-colors"
    >
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-blue-400">{event.year}</span>
        <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-xs text-zinc-400">{event.category}</span>
      </div>
      <h3 className="text-lg font-bold text-zinc-100">{event.title}</h3>
      <p className="mt-2 text-sm text-zinc-400">{event.summary}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {event.technologies.map((tech: string) => (
          <span key={tech} className="rounded bg-zinc-800 px-2 py-1 text-xs text-zinc-300">
            {tech}
          </span>
        ))}
      </div>
    </motion.div>
  );
};
