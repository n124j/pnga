import { ClipboardList, GraduationCap, HandHeart, HeartHandshake, HeartPulse, Vote } from 'lucide-react';
import type { Program } from '../data/programs';

const ICONS = { HeartHandshake, GraduationCap, HeartPulse, Vote, ClipboardList, HandHeart };

export default function ProgramIcon({ name, size = 32 }: { name: Program['icon']; size?: number }) {
  const Icon = ICONS[name];
  return <Icon size={size} aria-hidden="true" />;
}
