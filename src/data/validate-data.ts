import { RoadmapEventSchema } from '../schemas/roadmap.ts';
import roadmapData from './learning-roadmap.json' with { type: 'json' };

// Simple validation test
const result = RoadmapEventSchema.array().safeParse(roadmapData);

if (!result.success) {
  console.error('Data validation failed:', result.error);
  process.exit(1);
} else {
  console.log('Data validation passed.');
}
