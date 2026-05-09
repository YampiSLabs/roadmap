import { z } from 'zod';

export const RoadmapEventSchema = z.object({
  id: z.string(),
  year: z.number(),
  period: z.string(),
  title: z.string(),
  category: z.string(),
  status: z.enum(['historical', 'active', 'consolidating', 'exploring']),
  summary: z.string(),
  technologies: z.array(z.string()),
  context: z.string(),
  learned: z.array(z.string()),
  evidence: z.array(z.string()),
  currentRelevance: z.string(),
  tone: z.string(),
});

export type RoadmapEvent = z.infer<typeof RoadmapEventSchema>;

export const SkillSchema = z.object({
  name: z.string(),
  level: z.enum(['base', 'practico', 'solido', 'avanzado', 'explorando']),
  status: z.enum(['historico', 'activo', 'consolidando', 'explorando']),
  evidence: z.string(),
});

export const SkillGroupSchema = z.object({
  group: z.string(),
  skills: z.array(SkillSchema),
});

export const ProfileSchema = z.object({
  name: z.string(),
  title: z.string(),
  summary: z.string(),
  stack: z.array(z.string()),
});
