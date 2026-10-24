import type { LucideIcon } from 'lucide-react';
import {
  Code2,
  Cloud,
  Database,
  GitBranch,
  ShieldCheck,
  Cpu,
  Layers,
  Lock,
  BarChart3,
  Users,
  Server,
} from 'lucide-react';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface Question {
  id: number;
  difficulty: Difficulty;
  topic: string;
  icon: LucideIcon;
  text: string;
  transcript: string;
  aiNotes: string;
  score: number;
  overridden: boolean;
}

export interface Incident {
  id: number;
  time: string;
  label: string;
  severity: 'low' | 'med' | 'high';
  clipLabel: string;
}

export interface CandidateMetric {
  label: string;
  value: number;
  accent: string;
}

export const candidateMetrics: CandidateMetric[] = [
  { label: 'Technical Depth', value: 88, accent: '#2dd4bf' },
  { label: 'Trust Index', value: 92, accent: '#38bdf8' },
  { label: 'Communication Confidence', value: 79, accent: '#a78bfa' },
  { label: 'Answer Originality', value: 84, accent: '#f59e0b' },
];

export const questions: Question[] = [
  {
    id: 1,
    difficulty: 'Easy',
    topic: 'Data Structures',
    icon: Layers,
    text: 'Explain the difference between a stack and a queue, and give a real-world use case for each.',
    transcript:
      "A stack is last-in-first-out, like a browser's back button history. A queue is first-in-first-out, like a printer job queue. I use stacks for undo operations and queues for task scheduling in async workers.",
    aiNotes:
      'Clear, concise definition with two accurate analogies. Missed time complexity of push/pop vs enqueue/dequeue. Good communication.',
    score: 86,
    overridden: false,
  },
  {
    id: 2,
    difficulty: 'Medium',
    topic: 'System Design',
    icon: Server,
    text: 'Design a URL shortener that handles 100M requests per day. Walk me through your trade-offs.',
    transcript:
      "I'd start with a counter-based ID generator writing to Postgres, front it with a read-through Redis cache, and put a CDN in front for hot links. For writes I'd shard by counter range and use a queue to absorb spikes.",
    aiNotes:
      'Considered sharding and caching. Did not mention CAP trade-offs or eventual consistency on cache invalidation. Solid overall.',
    score: 81,
    overridden: false,
  },
  {
    id: 3,
    difficulty: 'Hard',
    topic: 'Concurrency',
    icon: GitBranch,
    text: 'How would you prevent lost updates in a distributed booking system without heavy locks?',
    transcript:
      "I'd use optimistic concurrency control with a version column, retry on conflict, and fall back to a compare-and-swap at the row level. For hot rows I'd batch writes through a single-writer actor to serialize them.",
    aiNotes:
      'Strong grasp of optimistic locking and single-writer pattern. Could have discussed idempotency keys for retries. Excellent depth.',
    score: 94,
    overridden: true,
  },
  {
    id: 4,
    difficulty: 'Medium',
    topic: 'Cloud',
    icon: Cloud,
    text: 'Compare horizontal vs vertical scaling and when each breaks down.',
    transcript:
      'Horizontal scaling adds nodes and handles failure better, but introduces consistency problems. Vertical scaling is simpler until you hit hardware limits. I prefer horizontal for stateless services and vertical for databases until sharding is unavoidable.',
    aiNotes:
      'Accurate trade-off framing. Did not mention cost curves or connection-pool limits on vertical scale.',
    score: 77,
    overridden: false,
  },
  {
    id: 5,
    difficulty: 'Hard',
    topic: 'Security',
    icon: Lock,
    text: 'Walk me through how you would secure a multi-tenant SaaS database with RLS.',
    transcript:
      "Enable row level security, write per-tenant policies using a tenant_id claim from the JWT, use SECURITY DEFINER functions for privileged mutations, and never expose service-role keys to the client. I'd also column-restrict sensitive fields.",
    aiNotes:
      'Correctly named RLS, SECURITY DEFINER, and column privileges. Implied real production experience.',
    score: 90,
    overridden: false,
  },
  {
    id: 6,
    difficulty: 'Easy',
    topic: 'Databases',
    icon: Database,
    text: 'What is a database index and when would adding one hurt you?',
    transcript:
      'An index is a sorted structure that speeds up reads. It hurts when you have high write throughput, because every write updates the index. I benchmark before adding indexes on hot tables.',
    aiNotes:
      'Correct on write-amplification. Missed storage cost and index maintenance on large composite keys.',
    score: 83,
    overridden: false,
  },
  {
    id: 7,
    difficulty: 'Medium',
    topic: 'Observability',
    icon: BarChart3,
    text: 'How do you decide between metrics, logs, and traces in an incident?',
    transcript:
      "Traces first to localize the slow span, then logs for the error detail, metrics to confirm blast radius. I instrument the critical path with traces and use structured logs with correlation IDs.",
    aiNotes:
      'Practical, opinionated workflow. Mentioned correlation IDs. Could expand on SLO-based alerting.',
    score: 85,
    overridden: false,
  },
  {
    id: 8,
    difficulty: 'Hard',
    topic: 'AI Infra',
    icon: Cpu,
    text: 'Design a low-latency inference pipeline for an LLM serving 10k concurrent users.',
    transcript:
      "I'd batch requests dynamically, use paged attention to reduce KV cache fragmentation, and put a token-level streaming gateway in front. For tail latency I'd keep warm replicas and shed load with a queue plus backpressure.",
    aiNotes:
      'Named paged attention, dynamic batching, and backpressure. Exceptional. Minor gap on model quantization trade-offs.',
    score: 96,
    overridden: false,
  },
  {
    id: 9,
    difficulty: 'Easy',
    topic: 'Best Practices',
    icon: ShieldCheck,
    text: 'What does SOLID stand for and which letter do teams break most often?',
    transcript:
      'Single responsibility, open-closed, Liskov, interface segregation, dependency inversion. The single responsibility principle is the most abused, because people lump unrelated logic into one class for convenience.',
    aiNotes:
      'Complete and accurate. Insightful real-world observation on SRP.',
    score: 89,
    overridden: false,
  },
  {
    id: 10,
    difficulty: 'Medium',
    topic: 'Coding',
    icon: Code2,
    text: 'Write a function to detect a cycle in a linked list. Explain your approach.',
    transcript:
      "Floyd's tortoise and hare: two pointers, one moves twice as fast. If they meet there's a cycle. O(n) time, O(1) space. Alternatively, a visited set is simpler but O(n) space.",
    aiNotes:
      'Optimal solution with both trade-offs stated. Clean delivery.',
    score: 91,
    overridden: false,
  },
];

export const incidents: Incident[] = [
  { id: 1, time: '01:45', label: 'Off-screen gaze', severity: 'low', clipLabel: '01:45 - Off-screen Gaze' },
  { id: 2, time: '03:22', label: 'Brief tab switch detected', severity: 'med', clipLabel: '03:22 - Tab Switch' },
  { id: 3, time: '06:12', label: 'Copy attempt blocked', severity: 'high', clipLabel: '06:12 - Copy Attempt' },
  { id: 4, time: '08:03', label: 'Mic muted mid-answer', severity: 'low', clipLabel: '08:03 - Mic Muted' },
  { id: 5, time: '11:40', label: 'Second person detected', severity: 'high', clipLabel: '11:40 - Multi-Person' },
];

export const candidateInfo = {
  name: 'Aarav Mehta',
  role: 'Senior Backend Engineer',
  email: 'aarav.mehta@email.com',
  resume: 'Aarav_Mehta_SeniorBE_2026.pdf',
  avatar:
    'https://images.pexels.com/photos/4348404/pexels-photo-4348404.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&fit=crop',
  experience: '7 years',
  location: 'Bengaluru, IN',
};

export const proctoringStats = [
  { label: 'Face Detection', status: 'ok', value: 'Locked' },
  { label: 'Gaze Tracker', status: 'ok', value: 'On-screen' },
  { label: 'Multi-Person', status: 'warn', value: '1 brief' },
  { label: 'Audio Level', status: 'ok', value: 'Active' },
];

export const liveTranscript = [
  { speaker: 'AI', text: "Walk me through how you'd prevent lost updates in a distributed booking system." },
  {
    speaker: 'Candidate',
    text: "I'd use optimistic concurrency control with a version column, retry on conflict, and fall back to a compare-and-swap at the row level...",
  },
  { speaker: 'AI', text: 'Good. And how would you handle a hot row with thousands of concurrent writes?' },
  { speaker: 'Candidate', text: "For hot rows I'd batch writes through a single-writer actor to serialize them." },
];

export const followUpAlerts = [
  'Cross-examination: candidate did not mention idempotency keys. Press for retry safety.',
  'Follow-up: ask for a concrete failure mode of optimistic locking under contention.',
];
