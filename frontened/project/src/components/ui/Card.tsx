import type { LucideIcon } from 'lucide-react';
import type { Difficulty } from '@/data/mock';

export function Card({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`glass rounded-2xl p-5 ${className}`}>{children}</div>
  );
}

export function SectionTitle({
  icon: Icon,
  title,
  subtitle,
}: {
  icon: LucideIcon;
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-teal-400/10 text-teal-300 ring-1 ring-teal-400/20">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <h2 className="text-lg font-semibold text-slate-100">{title}</h2>
        {subtitle && <p className="text-sm text-slate-400">{subtitle}</p>}
      </div>
    </div>
  );
}

const diffStyles: Record<Difficulty, string> = {
  Easy: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
  Medium: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
  Hard: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
};

export function DifficultyBadge({ level }: { level: Difficulty }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ${diffStyles[level]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {level}
    </span>
  );
}

export function ScoreRing({
  value,
  size = 56,
  stroke = 5,
}: {
  value: number;
  size?: number;
  stroke?: number;
}) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c - (value / 100) * c;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} stroke="#1e293b" strokeWidth={stroke} fill="none" />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={r}
        stroke="#2dd4bf"
        strokeWidth={stroke}
        fill="none"
        strokeLinecap="round"
        strokeDasharray={c}
        strokeDashoffset={offset}
        style={{ transition: 'stroke-dashoffset 0.8s ease' }}
      />
    </svg>
  );
}

export function Pill({
  children,
  tone = 'teal',
}: {
  children: React.ReactNode;
  tone?: 'teal' | 'slate' | 'amber' | 'rose' | 'emerald' | 'sky';
}) {
  const tones: Record<string, string> = {
    teal: 'bg-teal-500/15 text-teal-300 ring-teal-500/30',
    slate: 'bg-slate-500/15 text-slate-300 ring-slate-500/30',
    amber: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
    rose: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
    emerald: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
    sky: 'bg-sky-500/15 text-sky-300 ring-sky-500/30',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
