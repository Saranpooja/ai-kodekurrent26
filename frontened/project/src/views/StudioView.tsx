import { useEffect, useState } from 'react';
import {
  Video,
  Camera,
  Mic,
  ShieldCheck,
  ShieldAlert,
  Eye,
  Users,
  Gauge,
  Clock,
  QrCode,
  X,
  Copy,
  ClipboardCheck,
  Code2,
  Send,
  Zap,
  Radio,
  AlertTriangle,
} from 'lucide-react';
import { Card, DifficultyBadge, Pill } from '@/components/ui/Card';
import AvatarWaveform from '@/components/ui/AvatarWaveform';
import {
  candidateInfo,
  questions,
  followUpAlerts,
  liveTranscript,
  type Difficulty,
} from '@/data/mock';

const webcamImg =
  'https://images.pexels.com/photos/6285269/pexels-photo-6285269.jpeg?auto=compress&cs=tinysrgb&w=900&h=560&fit=crop';

export default function StudioView() {
  const [elapsed, setElapsed] = useState(528); // 08:48
  const [copyBlocked, setCopyBlocked] = useState(true);
  const [showQR, setShowQR] = useState(false);
  const [code, setCode] = useState(
    "function hasCycle(head) {\n  let slow = head, fast = head;\n  while (fast && fast.next) {\n    slow = slow.next;\n    fast = fast.next.next;\n    if (slow === fast) return true;\n  }\n  return false;\n}",
  );
  const [currentQ, setCurrentQ] = useState<Difficulty>('Hard');

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(elapsed / 60)).padStart(2, '0');
  const ss = String(elapsed % 60).padStart(2, '0');

  const handleCopy = (e: React.ClipboardEvent) => {
    e.preventDefault();
    setCopyBlocked(true);
    setTimeout(() => setCopyBlocked(false), 3500);
  };

  return (
    <div className="flex h-full flex-col gap-4 animate-fadeIn">
      {/* TOP BAR */}
      <div className="glass flex flex-wrap items-center justify-between gap-3 rounded-2xl px-5 py-3">
        <div className="flex items-center gap-3">
          <img
            src={candidateInfo.avatar}
            alt={candidateInfo.name}
            className="h-10 w-10 rounded-full object-cover ring-2 ring-teal-400/40"
          />
          <div>
            <p className="text-sm font-semibold text-slate-100">{candidateInfo.name}</p>
            <p className="text-xs text-slate-400">{candidateInfo.role}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Pill tone="slate">
            <Clock className="h-3.5 w-3.5" /> {mm}:{ss}
          </Pill>
          <Pill tone="emerald">
            <ShieldCheck className="h-3.5 w-3.5" /> AI Trust Score · 92%
          </Pill>
        </div>

        <div className="flex items-center gap-2">
          <ConnChip icon={Video} label="Webcam" tone="ok" />
          <ConnChip icon={Camera} label="Phone Cam" tone="ok" />
          <ConnChip icon={Mic} label="Mic" tone="ok" />
          <button
            onClick={() => setShowQR(true)}
            className="ml-1 inline-flex items-center gap-1.5 rounded-lg bg-teal-400/10 px-2.5 py-1.5 text-xs font-medium text-teal-300 ring-1 ring-teal-400/20 hover:bg-teal-400/20"
          >
            <QrCode className="h-3.5 w-3.5" /> Pair Mobile
          </button>
        </div>
      </div>

      {/* MAIN GRID */}
      <div className="grid flex-1 gap-4 lg:grid-cols-[320px_1fr]">
        {/* LEFT PANEL */}
        <div className="flex flex-col gap-4">
          <Card className="flex flex-col items-center">
            <AvatarWaveform active />
            <div className="mt-4 w-full space-y-2 border-t border-slate-700/50 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-wider text-slate-500">Current Question</span>
                <DifficultyBadge level={currentQ} />
              </div>
              <p className="text-sm text-slate-200">
                Q3 · How would you prevent lost updates in a distributed booking system without heavy
                locks?
              </p>
            </div>
            <div className="mt-4 w-full border-t border-slate-700/50 pt-3">
              <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-amber-300/80">
                <Zap className="h-3.5 w-3.5" /> Dynamic Cross-Examination
              </p>
              <div className="space-y-2">
                {followUpAlerts.map((a, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-amber-500/10 px-3 py-2 text-xs text-amber-200 ring-1 ring-amber-500/20"
                  >
                    {a}
                  </div>
                ))}
              </div>
            </div>
          </Card>

          <Card>
            <p className="mb-2 flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500">
              <Radio className="h-3.5 w-3.5 text-teal-300" /> Proctoring Telemetry
            </p>
            <div className="space-y-2">
              <Telemetry icon={ShieldCheck} label="Face Detection" value="Locked" tone="ok" />
              <Telemetry icon={Eye} label="Gaze Tracker" value="On-screen" tone="ok" />
              <Telemetry icon={Users} label="Multi-Person" value="1 brief" tone="warn" />
              <Telemetry icon={Gauge} label="Speech Pace" value="142 WPM" tone="ok" />
            </div>
          </Card>
        </div>

        {/* RIGHT MAIN */}
        <div className="grid min-h-0 gap-4">
          {/* webcam */}
          <Card className="relative min-h-0 flex-1 overflow-hidden p-0">
            <div className="relative h-full min-h-[260px]">
              <img src={webcamImg} alt="Primary webcam" className="h-full w-full object-cover" />
              {/* overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-slate-950/40" />

              {/* scan line */}
              <div className="pointer-events-none absolute inset-0 overflow-hidden">
                <div className="absolute left-0 right-0 h-px bg-teal-400/50 animate-scan" />
              </div>

              {/* proctoring HUD */}
              <div className="absolute left-4 top-4 flex flex-col gap-2">
                <HudChip icon={ShieldCheck} label="Face Detected" tone="ok" />
                <HudChip icon={Eye} label="Gaze: Center" tone="ok" />
                <HudChip icon={Users} label="Multi-Person Alert" tone="warn" />
                <HudChip icon={Gauge} label="WPM 142 · Normal" tone="ok" />
              </div>

              {/* bounding box mock */}
              <div className="absolute left-1/2 top-1/2 h-44 w-36 -translate-x-1/2 -translate-y-1/2 rounded-lg border-2 border-teal-400/60 shadow-[0_0_20px_-2px_rgba(45,212,191,0.5)]">
                <span className="absolute -top-6 left-0 rounded bg-teal-400/80 px-1.5 py-0.5 text-[10px] font-semibold text-slate-950">
                  person · 0.98
                </span>
              </div>

              {/* REC */}
              <div className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-rose-500/20 px-2.5 py-1 text-xs font-semibold text-rose-300 ring-1 ring-rose-500/30">
                <span className="h-2 w-2 animate-pulse rounded-full bg-rose-400" /> REC
              </div>
            </div>
          </Card>

          {/* code sandbox */}
          <Card className="min-h-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-200">
                <Code2 className="h-4 w-4 text-teal-300" />
                <span className="text-sm font-semibold">Live Code Sandbox</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="rounded-md bg-slate-800 px-2 py-0.5 text-xs text-slate-400">
                  JavaScript
                </span>
                <button
                  onCopy={handleCopy}
                  className="inline-flex items-center gap-1.5 rounded-md bg-slate-800 px-2 py-1 text-xs text-slate-300 hover:bg-slate-700"
                >
                  <Copy className="h-3.5 w-3.5" /> Copy
                </button>
              </div>
            </div>
            {copyBlocked && (
              <div className="mt-3 flex items-center gap-2 rounded-lg bg-rose-500/10 px-3 py-2 text-xs text-rose-300 ring-1 ring-rose-500/30 animate-fadeIn">
                <AlertTriangle className="h-4 w-4" />
                Copy-Paste Guard: external paste blocked. Originality score protected.
              </div>
            )}
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onCopy={handleCopy}
              onPaste={handleCopy}
              spellCheck={false}
              rows={6}
              className="mt-3 w-full resize-none rounded-lg border border-slate-700 bg-slate-950/70 p-3 font-mono text-xs text-teal-200/90 outline-none focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/30"
            />
            <div className="mt-2 flex items-center justify-between">
              <Pill tone="emerald">
                <ClipboardCheck className="h-3 w-3" /> Original typing detected
              </Pill>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-teal-400/15 px-3 py-1.5 text-xs font-medium text-teal-300 ring-1 ring-teal-400/30 hover:bg-teal-400/25">
                <Send className="h-3.5 w-3.5" /> Submit Answer
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* BOTTOM TRANSCRIPT */}
      <Card className="py-3">
        <div className="mb-2 flex items-center justify-between">
          <p className="flex items-center gap-1.5 text-xs uppercase tracking-wider text-slate-500">
            <Radio className="h-3.5 w-3.5 text-teal-300" /> Live STT Transcript
          </p>
          <Pill tone="sky">Streaming · 142 WPM</Pill>
        </div>
        <div className="max-h-28 space-y-1.5 overflow-y-auto pr-1">
          {liveTranscript.map((l, i) => (
            <p key={i} className="text-sm">
              <span
                className={`mr-2 font-semibold ${
                  l.speaker === 'AI' ? 'text-teal-300' : 'text-sky-300'
                }`}
              >
                {l.speaker}:
              </span>
              <span className="text-slate-300">{l.text}</span>
            </p>
          ))}
          <p className="text-sm text-slate-500">
            <span className="mr-2 font-semibold text-teal-300">AI:</span>
            <span className="shimmer-text">Good. And how would you handle a hot row…</span>
          </p>
        </div>
      </Card>

      {/* QR MODAL */}
      {showQR && <QRModal onClose={() => setShowQR(false)} />}
    </div>
  );
}

function ConnChip({
  icon: Icon,
  label,
  tone,
}: {
  icon: typeof Video;
  label: string;
  tone: 'ok' | 'warn' | 'err';
}) {
  const tones = {
    ok: 'text-emerald-300 ring-emerald-500/30 bg-emerald-500/10',
    warn: 'text-amber-300 ring-amber-500/30 bg-amber-500/10',
    err: 'text-rose-300 ring-rose-500/30 bg-rose-500/10',
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-xs font-medium ring-1 ${tones[tone]}`}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}

function Telemetry({
  icon: Icon,
  label,
  value,
  tone,
}: {
  icon: typeof ShieldCheck;
  label: string;
  value: string;
  tone: 'ok' | 'warn' | 'err';
}) {
  const dot = {
    ok: 'bg-emerald-400',
    warn: 'bg-amber-400',
    err: 'bg-rose-400',
  }[tone];
  return (
    <div className="flex items-center justify-between rounded-lg bg-slate-900/50 px-3 py-2 ring-1 ring-slate-700/40">
      <span className="flex items-center gap-2 text-xs text-slate-300">
        <Icon className="h-4 w-4 text-slate-400" />
        {label}
      </span>
      <span className="flex items-center gap-1.5 text-xs font-medium text-slate-200">
        <span className={`h-1.5 w-1.5 rounded-full ${dot} ${tone === 'warn' ? 'animate-pulse' : ''}`} />
        {value}
      </span>
    </div>
  );
}

function HudChip({
  icon: Icon,
  label,
  tone,
}: {
  icon: typeof ShieldCheck;
  label: string;
  tone: 'ok' | 'warn' | 'err';
}) {
  const tones = {
    ok: 'bg-emerald-500/15 text-emerald-300 ring-emerald-500/30',
    warn: 'bg-amber-500/15 text-amber-300 ring-amber-500/30',
    err: 'bg-rose-500/15 text-rose-300 ring-rose-500/30',
  } as const;
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-[11px] font-medium ring-1 backdrop-blur ${tones[tone]}`}>
      <Icon className="h-3 w-3" />
      {label}
    </span>
  );
}

function QRModal({ onClose }: { onClose: () => void }) {
  // crude QR-ish grid
  const cells = Array.from({ length: 121 }).map((_, i) => {
    const edge = i < 11 || i >= 110 || i % 11 === 0 || i % 11 === 10;
    const corner = (i < 33 && i % 11 < 3) || (i < 33 && i % 11 > 7) || (i >= 88 && i % 11 < 3);
    return edge || corner || (i * 7) % 3 === 0;
  });
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/70 backdrop-blur-sm">
      <div className="glass w-80 rounded-2xl p-6 text-center animate-fadeIn">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-slate-100">Mobile Camera Pairing</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200">
            <X className="h-4 w-4" />
          </button>
        </div>
        <p className="mt-1 text-xs text-slate-400">Scan to add a secondary proctoring camera</p>
        <div className="mx-auto mt-4 grid w-fit grid-cols-11 gap-px rounded-lg bg-white p-3">
          {cells.map((on, i) => (
            <span key={i} className={`h-2.5 w-2.5 ${on ? 'bg-slate-900' : 'bg-white'}`} />
          ))}
        </div>
        <p className="mt-3 text-xs text-slate-500">hireai.app/pair/a4f9c2</p>
        <div className="mt-4 flex items-center justify-center gap-2">
          <Pill tone="emerald">
            <Camera className="h-3 w-3" /> Waiting for device…
          </Pill>
        </div>
      </div>
    </div>
  );
}
