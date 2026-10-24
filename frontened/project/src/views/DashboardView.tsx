import { useState } from 'react';
import {
  Award,
  BarChart3,
  ClipboardList,
  ShieldAlert,
  UserCheck,
  Download,
  RotateCcw,
  ChevronRight,
  Play,
  AlertTriangle,
} from 'lucide-react';
import { Card, SectionTitle, ScoreRing, DifficultyBadge, Pill } from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';
import {
  candidateInfo,
  candidateMetrics,
  questions,
  incidents,
  type Question,
} from '@/data/mock';

export default function DashboardView() {
  const [override, setOverride] = useState(false);
  const [fitScore, setFitScore] = useState(87);
  const [overrideFit, setOverrideFit] = useState(false);
  const [qs, setQs] = useState<Question[]>(questions);
  const [selectedIncident, setSelectedIncident] = useState<number | null>(2);
  const [expanded, setExpanded] = useState<number | null>(3);

  const avgQ = Math.round(qs.reduce((s, q) => s + q.score, 0) / qs.length);

  const updateScore = (id: number, delta: number) => {
    setQs((prev) =>
      prev.map((q) =>
        q.id === id ? { ...q, score: Math.max(0, Math.min(100, q.score + delta)), overridden: true } : q,
      ),
    );
  };

  const sev = {
    low: 'text-emerald-300 bg-emerald-500/10 ring-emerald-500/30',
    med: 'text-amber-300 bg-amber-500/10 ring-amber-500/30',
    high: 'text-rose-300 bg-rose-500/10 ring-rose-500/30',
  } as const;

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-fadeIn">
      {/* header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex items-center gap-4">
          <img
            src={candidateInfo.avatar}
            alt={candidateInfo.name}
            className="h-14 w-14 rounded-2xl object-cover ring-2 ring-teal-400/40"
          />
          <div>
            <h1 className="text-2xl font-bold text-slate-50">Intelligence Dashboard</h1>
            <p className="text-sm text-slate-400">
              {candidateInfo.name} · {candidateInfo.role} · {candidateInfo.experience}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700">
            <Download className="h-3.5 w-3.5" /> Export Report
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800 px-3 py-2 text-xs font-medium text-slate-300 hover:bg-slate-700">
            <RotateCcw className="h-3.5 w-3.5" /> Re-interview
          </button>
        </div>
      </div>

      {/* top row: fit score + metrics */}
      <div className="grid gap-6 lg:grid-cols-[340px_1fr]">
        <Card className="flex flex-col items-center">
          <SectionTitle icon={Award} title="Overall Fit Score" />
          <div className="relative my-4 grid place-items-center">
            <ScoreRing value={overrideFit ? fitScore : avgQ} size={140} stroke={10} />
            <div className="absolute text-center">
              <p className="text-4xl font-bold text-gradient">{overrideFit ? fitScore : avgQ}</p>
              <p className="text-xs text-slate-500">out of 100</p>
            </div>
          </div>
          <div className="w-full rounded-lg bg-slate-900/50 px-3 py-2 ring-1 ring-slate-700/40">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs text-slate-300">
                <UserCheck className="h-3.5 w-3.5 text-teal-300" /> Human Recruiter Override
              </span>
              <Toggle checked={overrideFit} onChange={setOverrideFit} />
            </div>
            {overrideFit && (
              <div className="mt-3 flex items-center gap-2 animate-fadeIn">
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={fitScore}
                  onChange={(e) => setFitScore(Number(e.target.value))}
                  className="w-full accent-teal-400"
                />
                <span className="w-8 text-center text-sm font-bold text-teal-300">{fitScore}</span>
              </div>
            )}
          </div>
          <div className="mt-4 grid w-full grid-cols-3 gap-2 text-center">
            <Stat label="Questions" value={String(qs.length)} />
            <Stat label="Duration" value="22:14" />
            <Stat label="Incidents" value={String(incidents.length)} />
          </div>
        </Card>

        <Card>
          <SectionTitle
            icon={BarChart3}
            title="Candidate Analytics"
            subtitle="Composite scores across four dimensions"
          />
          <div className="mt-6 space-y-5">
            {candidateMetrics.map((m) => (
              <div key={m.label}>
                <div className="mb-1.5 flex items-center justify-between text-sm">
                  <span className="text-slate-300">{m.label}</span>
                  <span className="font-semibold text-slate-100">{m.value}</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${m.value}%`, backgroundColor: m.accent }}
                  />
                </div>
              </div>
            ))}
          </div>
          {/* mini bar chart */}
          <div className="mt-6 flex items-end justify-between gap-2 border-t border-slate-700/50 pt-5">
            {qs.map((q) => (
              <div key={q.id} className="flex flex-1 flex-col items-center gap-1">
                <div className="flex h-28 w-full items-end justify-center">
                  <div
                    className="w-4 rounded-t bg-gradient-to-t from-teal-600 to-teal-300 transition-all"
                    style={{ height: `${q.score}%` }}
                    title={`Q${q.id}: ${q.score}`}
                  />
                </div>
                <span className="text-[10px] text-slate-500">Q{q.id}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* question breakdown */}
      <Card>
        <div className="flex items-center justify-between">
          <SectionTitle
            icon={ClipboardList}
            title="Question-by-Question Breakdown"
            subtitle="Transcripts, AI evaluation, and manual override controls"
          />
          <div className="flex items-center gap-2">
            <Toggle checked={override} onChange={setOverride} label="Enable Overrides" />
          </div>
        </div>

        <div className="mt-5 space-y-2">
          {qs.map((q) => (
            <div key={q.id} className="rounded-xl border border-slate-700/50 bg-slate-900/40">
              <button
                onClick={() => setExpanded(expanded === q.id ? null : q.id)}
                className="flex w-full items-center gap-3 px-4 py-3 text-left"
              >
                <ChevronRight
                  className={`h-4 w-4 text-slate-400 transition-transform ${expanded === q.id ? 'rotate-90' : ''}`}
                />
                <span className="grid h-7 w-7 place-items-center rounded-lg bg-teal-400/10 text-xs font-semibold text-teal-300">
                  {q.id}
                </span>
                <span className="flex items-center gap-1.5 text-slate-300">
                  <q.icon className="h-4 w-4 text-slate-400" />
                  <span className="text-sm font-medium">{q.topic}</span>
                </span>
                <DifficultyBadge level={q.difficulty} />
                <span className="ml-auto flex items-center gap-3">
                  {q.overridden && <Pill tone="amber">Overridden</Pill>}
                  <span className="text-sm font-bold text-teal-300">{q.score}</span>
                </span>
              </button>

              {expanded === q.id && (
                <div className="grid gap-4 px-4 pb-4 md:grid-cols-2">
                  <div className="rounded-lg bg-slate-950/50 p-3 ring-1 ring-slate-700/40">
                    <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">Question</p>
                    <p className="text-sm text-slate-200">{q.text}</p>
                    <p className="mb-1 mt-3 text-xs uppercase tracking-wider text-slate-500">
                      Candidate Transcript
                    </p>
                    <p className="text-sm italic text-slate-400">"{q.transcript}"</p>
                  </div>
                  <div className="rounded-lg bg-slate-950/50 p-3 ring-1 ring-slate-700/40">
                    <p className="mb-1 text-xs uppercase tracking-wider text-slate-500">
                      AI Evaluation Notes
                    </p>
                    <p className="text-sm text-slate-300">{q.aiNotes}</p>

                    {override && (
                      <div className="mt-3 border-t border-slate-700/50 pt-3">
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="text-slate-400">Score Override</span>
                          <span className="font-bold text-teal-300">{q.score}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <input
                            type="range"
                            min={0}
                            max={100}
                            value={q.score}
                            onChange={(e) =>
                              setQs((prev) =>
                                prev.map((x) =>
                                  x.id === q.id
                                    ? { ...x, score: Number(e.target.value), overridden: true }
                                    : x,
                                ),
                              )
                            }
                            className="w-full accent-teal-400"
                          />
                          <button
                            onClick={() => updateScore(q.id, -1)}
                            className="rounded bg-slate-800 px-2 py-0.5 text-xs hover:bg-slate-700"
                          >
                            −
                          </button>
                          <button
                            onClick={() => updateScore(q.id, 1)}
                            className="rounded bg-slate-800 px-2 py-0.5 text-xs hover:bg-slate-700"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </Card>

      {/* incident timeline */}
      <Card>
        <SectionTitle
          icon={ShieldAlert}
          title="Proctoring Incident Timeline"
          subtitle="Click a timestamped clip to review"
        />
        <div className="mt-5 grid gap-4 lg:grid-cols-[1fr_320px]">
          <div className="relative pl-6">
            {/* vertical line */}
            <div className="absolute left-2 top-1 bottom-1 w-px bg-slate-700/60" />
            <div className="space-y-3">
              {incidents.map((inc) => (
                <button
                  key={inc.id}
                  onClick={() => setSelectedIncident(inc.id)}
                  className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                    selectedIncident === inc.id
                      ? 'bg-slate-800/80 ring-1 ring-teal-400/30'
                      : 'hover:bg-slate-800/50'
                  }`}
                >
                  <span
                    className={`relative -left-[18px] h-2.5 w-2.5 rounded-full ring-2 ring-slate-900 ${
                      inc.severity === 'high'
                        ? 'bg-rose-400'
                        : inc.severity === 'med'
                          ? 'bg-amber-400'
                          : 'bg-emerald-400'
                    }`}
                  />
                  <span className="font-mono text-xs text-slate-400">{inc.time}</span>
                  <span
                    className={`rounded px-2 py-0.5 text-[10px] font-semibold uppercase ring-1 ${sev[inc.severity]}`}
                  >
                    {inc.severity}
                  </span>
                  <span className="text-sm text-slate-300">{inc.label}</span>
                  <span className="ml-auto inline-flex items-center gap-1 text-xs text-teal-300 opacity-0 transition group-hover:opacity-100">
                    <Play className="h-3 w-3" /> play
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* clip preview */}
          <div className="rounded-xl border border-slate-700/50 bg-slate-950/60 p-3">
            {(() => {
              const inc = incidents.find((i) => i.id === selectedIncident) ?? incidents[0];
              return (
                <div>
                  <div className="relative grid h-40 place-items-center overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 to-slate-950 ring-1 ring-slate-700/60">
                    <div className="absolute inset-0 bg-grid opacity-40" />
                    <div className="relative grid h-12 w-12 place-items-center rounded-full bg-teal-400/20 text-teal-300 ring-1 ring-teal-400/40">
                      <Play className="h-5 w-5" />
                    </div>
                    <div className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-rose-500/20 px-2 py-0.5 text-[10px] font-semibold text-rose-300">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-rose-400" /> CLIP
                    </div>
                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-mono text-xs text-slate-300">{inc.clipLabel}</span>
                      <span className="font-mono text-xs text-slate-500">00:08</span>
                    </div>
                  </div>
                  <div className="mt-3 flex items-center gap-2">
                    <AlertTriangle
                      className={`h-4 w-4 ${
                        inc.severity === 'high'
                          ? 'text-rose-400'
                          : inc.severity === 'med'
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                      }`}
                    />
                    <span className="text-sm text-slate-300">{inc.label}</span>
                  </div>
                  <p className="mt-1 text-xs text-slate-500">
                    Auto-captured snippet with gaze + screen telemetry attached for recruiter review.
                  </p>
                </div>
              );
            })()}
          </div>
        </div>
      </Card>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-slate-900/50 py-2 ring-1 ring-slate-700/40">
      <p className="text-lg font-bold text-slate-100">{value}</p>
      <p className="text-[10px] uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  );
}
