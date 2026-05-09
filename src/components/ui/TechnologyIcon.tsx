import { FaCode } from 'react-icons/fa6';
import { normalizeTechnologyName, TECHNOLOGY_ICONS } from './technologyIcons';

type TechnologyIconProps = {
  name: string;
  size?: number;
  className?: string;
};

export const TechnologyIcon = ({ name, size = 12, className = 'text-zinc-400' }: TechnologyIconProps) => {
  const Icon = TECHNOLOGY_ICONS[normalizeTechnologyName(name)] ?? FaCode;
  return <Icon size={size} className={className} aria-hidden="true" />;
};
