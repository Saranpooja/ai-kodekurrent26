import { useRef, useState } from 'react';
import {
  FileText,
  UploadCloud,
  Briefcase,
  Hash,
  Brain,
  ScanText,
  Check,
  X,
  Sparkles,
  PlayCircle,
} from 'lucide-react';
import { Card, SectionTitle, Pill } from '@/components/ui/Card';
import Toggle from '@/components/ui/Toggle';

const sampleJobDesc = `Senior Backend Engineer — Platform Team

We're looking for an engineer to design and scale our multi-tenant data platform. You'll own services handling 100M+ requests/day, work on distributed systems, and partner with ML teams on inference infra.

Requirements:
- 5+ years building production backend systems
- Deep knowledge of Postgres, Redis, and message queues
- Experience with concurrency, sharding, and RLS
- Strong fundamentals in system design and observability`;

export default function SetupView({ onStart }: { onStart: () => void }) {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDesc, setJobDesc] = useState(sampleJobDesc);
  const [questionCount, setQuestionCount] = useState(10);
  const [adaptive, setAdaptive] = useState(true);
  const [aiAnswer, setAiAnswer] = useState(true);
  const [dragging, setDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null) => {
    if (f && f.type === 'application/pdf') setResume(f);
    else if (f) setResume(f); // accept anyway for demo
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 animate-fadeIn">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-50">Recruiter Config &amp; Setup</h1>
          <p className="text-sm text-slate-400">
            Define the candidate, the role, and how the AI interviewer should behave.
          </p>
        </div>
        <button
          onClick={onStart}
          className="inline-flex items-center gap-2 rounded-xl bg-teal-400 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 glow-teal"
        >
          <PlayCircle className="h-5 w-5" />
          Launch Interview
        </button>
      </div>

      {/* uploads + job desc */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <SectionTitle icon={FileText} title="Candidate Resume" subtitle="Upload a .pdf resume to seed context" />
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragging(true);
            }}
            onDragLeave={() => setDragging(false)}
            onDrop={(e) => {
              e.preventDefault();
              setDragging(false);
              handleFile(e.dataTransfer.files?.[0] ?? null);
            }}
            onClick={() => inputRef.current?.click()}
            className={`mt-4 grid cursor-pointer place-items-center rounded-xl border-2 border-dashed px-6 py-10 text-center transition ${
              dragging
                ? 'border-teal-400 bg-teal-400/10'
                : 'border-slate-700 hover:border-teal-400/60 hover:bg-slate-800/40'
            }`}
          >
            <input
              ref={inputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] ?? null)}
            />
            {resume ? (
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-lg bg-emerald-500/15 text-emerald-300">
                  <Check className="h-6 w-6" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-slate-100">{resume.name}</p>
                  <p className="text-xs text-slate-400">
                    {(resume.size / 1024).toFixed(0)} KB · Parsed
                  </p>
                </div>
              </div>
            ) : (
              <>
                <UploadCloud className="h-10 w-10 text-teal-300/80" />
                <p className="mt-3 font-medium text-slate-200">Drop resume here or click to upload</p>
                <p className="text-xs text-slate-500">PDF up to 10MB</p>
              </>
            )}
          </div>
          {resume && (
            <button
              onClick={() => setResume(null)}
              className="mt-3 inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-rose-300"
            >
              <X className="h-3.5 w-3.5" /> Remove
            </button>
          )}
        </Card>

        <Card>
          <SectionTitle icon={Briefcase} title="Job Description" subtitle="Paste the role, requirements, and seniority" />
          <textarea
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            rows={9}
            className="mt-4 w-full resize-none rounded-xl border border-slate-700 bg-slate-900/60 p-3 text-sm text-slate-200 outline-none transition focus:border-teal-400/60 focus:ring-1 focus:ring-teal-400/30"
            placeholder="Paste the job description..."
          />
          <div className="mt-2 flex items-center gap-2">
            <Pill tone="teal">
              <Sparkles className="h-3 w-3" /> {jobDesc.trim().split(/\s+/).length} words detected
            </Pill>
          </div>
        </Card>
      </div>

      {/* question config */}
      <Card>
        <SectionTitle
          icon={Brain}
          title="Question Configuration"
          subtitle="Tune the interview length and intelligence layer"
        />

        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {/* count */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-5">
            <div className="flex items-center gap-2 text-slate-300">
              <Hash className="h-4 w-4 text-teal-300" />
              <span className="text-sm font-medium">Question Count</span>
            </div>
            <div className="mt-4 flex items-end gap-3">
              <input
                type="range"
                min={3}
                max={20}
                value={questionCount}
                onChange={(e) => setQuestionCount(Number(e.target.value))}
                className="w-full accent-teal-400"
              />
              <span className="w-10 text-center text-2xl font-bold text-teal-300">
                {questionCount}
              </span>
            </div>
            <p className="mt-2 text-xs text-slate-500">
              Estimated ~{Math.round(questionCount * 1.5)} min interview
            </p>
          </div>

          {/* adaptive */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <Brain className="h-4 w-4 text-teal-300" />
                <span className="text-sm font-medium">Smart Difficulty Scaling</span>
              </div>
              <Toggle checked={adaptive} onChange={setAdaptive} />
            </div>
            <p className="mt-3 text-xs text-slate-400">
              {adaptive ? (
                <span className="text-emerald-300">Adaptive ladder enabled · AI ramps difficulty based on answer quality.</span>
              ) : (
                'Fixed difficulty. All candidates get the same question set.'
              )}
            </p>
            {adaptive && (
              <div className="mt-3 flex gap-1.5">
                {['Easy', 'Medium', 'Hard'].map((d) => (
                  <Pill key={d} tone={d === 'Easy' ? 'emerald' : d === 'Medium' ? 'amber' : 'rose'}>
                    {d}
                  </Pill>
                ))}
              </div>
            )}
          </div>

          {/* ai answer detection */}
          <div className="rounded-xl border border-slate-700/60 bg-slate-900/40 p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-slate-300">
                <ScanText className="h-4 w-4 text-teal-300" />
                <span className="text-sm font-medium">AI-Answer Detection</span>
              </div>
              <Toggle checked={aiAnswer} onChange={setAiAnswer} />
            </div>
            <p className="mt-3 text-xs text-slate-400">
              {aiAnswer ? (
                <span className="text-emerald-300">Flag ChatGPT-style answers in real time using semantic originality scoring.</span>
              ) : (
                'No originality checks performed.'
              )}
            </p>
          </div>
        </div>

        {/* summary strip */}
        <div className="mt-6 flex flex-wrap items-center gap-3 rounded-xl bg-slate-900/60 p-4 ring-1 ring-slate-700/50">
          <span className="text-sm font-medium text-slate-300">Interview brief:</span>
          <Pill tone="teal">{questionCount} questions</Pill>
          <Pill tone="slate">{adaptive ? 'Adaptive ladder' : 'Fixed'}</Pill>
          <Pill tone={aiAnswer ? 'emerald' : 'slate'}>
            {aiAnswer ? 'AI detection on' : 'AI detection off'}
          </Pill>
          <Pill tone="sky">~{Math.round(questionCount * 1.5)} min</Pill>
        </div>
      </Card>
    </div>
  );
}
