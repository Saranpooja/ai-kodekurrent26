import { useState } from 'react';
import { Settings2, Video, LayoutDashboard, Bot, Github, CircleDot } from 'lucide-react';
import SetupView from '@/views/SetupView';
import StudioView from '@/views/StudioView';
import DashboardView from '@/views/DashboardView';

type View = 'setup' | 'studio' | 'dashboard';

const nav: { id: View; label: string; icon: typeof Settings2; hint: string }[] = [
  { id: 'setup', label: 'Config & Setup', icon: Settings2, hint: '01' },
  { id: 'studio', label: 'Live Interview', icon: Video, hint: '02' },
  { id: 'dashboard', label: 'Intelligence', icon: LayoutDashboard, hint: '03' },
];

export default function App() {
  const [view, setView] = useState<View>('setup');

  return (
    <div className="flex h-screen overflow-hidden bg-slate-950 text-slate-200">
      {/* Sidebar */}
      <aside className="flex w-64 flex-col border-r border-slate-800/60 bg-slate-950/80">
        <div className="flex items-center gap-3 px-5 py-5">
          <div className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-teal-400 to-teal-600 text-slate-950 shadow-lg glow-teal">
            <Bot className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-bold tracking-tight text-slate-50">
              Hire<span className="text-gradient">AI</span>
            </p>
            <p className="text-[10px] uppercase tracking-widest text-slate-500">
              Interviewer Studio
            </p>
          </div>
        </div>

        <nav className="mt-2 flex-1 space-y-1 px-3">
          {nav.map((n) => {
            const active = view === n.id;
            return (
              <button
                key={n.id}
                onClick={() => setView(n.id)}
                className={`group relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition ${
                  active
                    ? 'bg-teal-400/10 text-teal-200 ring-1 ring-teal-400/20'
                    : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
                }`}
              >
                {active && (
                  <span className="absolute left-0 top-1/2 h-6 -translate-y-1/2 w-1 rounded-r bg-teal-400" />
                )}
                <n.icon className={`h-4.5 w-4.5 ${active ? 'text-teal-300' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span className="flex-1 text-sm font-medium">{n.label}</span>
                <span className="font-mono text-[10px] text-slate-600">{n.hint}</span>
              </button>
            );
          })}
        </nav>

        <div className="space-y-3 px-5 py-4">
          <div className="rounded-xl bg-slate-900/60 p-3 ring-1 ring-slate-800/60">
            <div className="flex items-center gap-2">
              <CircleDot className="h-3.5 w-3.5 animate-pulse text-emerald-400" />
              <span className="text-xs font-medium text-slate-300">Proctoring Engine</span>
            </div>
            <p className="mt-1 text-[10px] text-slate-500">MediaPipe · STT · LLM v4 online</p>
          </div>
          <div className="flex items-center justify-between text-[10px] text-slate-600">
            <span>v2.4 · hackathon demo</span>
            <Github className="h-3.5 w-3.5" />
          </div>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-y-auto bg-grid">
        {/* subtle top glow */}
        <div className="pointer-events-none sticky top-0 z-10 h-16 bg-gradient-to-b from-slate-950 to-transparent" />
        <div className="-mt-16 min-h-full p-6">
          {view === 'setup' && <SetupView onStart={() => setView('studio')} />}
          {view === 'studio' && <StudioView />}
          {view === 'dashboard' && <DashboardView />}
        </div>
      </main>
    </div>
  );
}
