import { Bot } from 'lucide-react';

export default function AvatarWaveform({ active = true }: { active?: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* glow rings */}
      <div className="absolute h-36 w-36 rounded-full bg-teal-400/10 animate-pulseRing" />
      <div className="absolute h-36 w-36 rounded-full bg-teal-400/5 animate-pulseRing [animation-delay:0.6s]" />

      {/* avatar orb */}
      <div className="relative grid h-32 w-32 place-items-center rounded-full bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 ring-1 ring-teal-400/30 glow-teal animate-floatSlow">
        <div className="absolute inset-2 rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(45,212,191,0.25),transparent_60%)]" />
        <Bot className="relative h-14 w-14 text-teal-300" />
        {/* scan line */}
        <div className="absolute inset-2 overflow-hidden rounded-full">
          <div className="absolute left-0 right-0 h-px bg-teal-400/60 animate-scan" />
        </div>
      </div>

      {/* waveform */}
      <div className="mt-4 flex h-10 items-end gap-1">
        {Array.from({ length: 24 }).map((_, i) => (
          <span
            key={i}
            className={`w-1 rounded-full bg-teal-400/80 ${
              active ? 'animate-growBar' : 'opacity-40'
            }`}
            style={{
              height: `${10 + ((i * 37) % 24)}px`,
              animationDelay: `${(i % 8) * 0.12}s`,
            }}
          />
        ))}
      </div>
      <p className="mt-2 text-xs font-medium uppercase tracking-widest text-teal-300/80">
        {active ? 'AI Interviewer · Speaking' : 'AI Interviewer · Idle'}
      </p>
    </div>
  );
}
