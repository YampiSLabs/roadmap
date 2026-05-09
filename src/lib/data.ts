import { z } from 'zod';
import { RoadmapEventSchema, SkillGroupSchema, ProfileSchema } from '../schemas/roadmap';
import roadmapData from '../data/learning-roadmap.json';
import skillGroupsData from '../data/skill-groups.json';
import profileData from '../data/profile.public.json';

const parsedRoadmap = z.array(RoadmapEventSchema).parse(roadmapData);
const parsedSkillGroups = z.array(SkillGroupSchema).parse(skillGroupsData);
const parsedProfile = ProfileSchema.parse(profileData);

export const getRoadmap = () => parsedRoadmap;
export const getSkillGroups = () => parsedSkillGroups;
export const getProfile = () => parsedProfile;
