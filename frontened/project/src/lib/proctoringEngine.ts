import { FaceLandmarker, FilesetResolver } from '@mediapipe/tasks-vision';

export type ProctoringStatus = 'FACE_PRESENT' | 'GAZE_AVERTED' | 'MULTIPLE_FACES' | 'NO_FACE';

export interface ProctoringEvent {
  timestamp: string;
  status: ProctoringStatus;
  description: string;
}

export class ProctoringEngine {
  private faceLandmarker: FaceLandmarker | null = null;
  private consecutiveOffScreenFrames = 0;
  private onStatusChangeCallback: (event: ProctoringEvent) => void;

  constructor(onStatusChange: (event: ProctoringEvent) => void) {
    this.onStatusChangeCallback = onStatusChange;
  }

  public async initialize() {
    const filesetResolver = await FilesetResolver.forVisionTasks(
      'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@latest/wasm'
    );
    this.faceLandmarker = await FaceLandmarker.createFromOptions(filesetResolver, {
      baseOptions: {
        modelAssetPath:
          'https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task',
        delegate: 'GPU',
      },
      runningMode: 'VIDEO',
      numFaces: 4,
    });
  }

  public processVideoFrame(videoElement: HTMLVideoElement, timestampMs: number) {
    if (!this.faceLandmarker || videoElement.readyState < 2) return;

    const results = this.faceLandmarker.detectForVideo(videoElement, timestampMs);

    // Rule 1: No Candidate Detected
    if (results.faceLandmarks.length === 0) {
      this.onStatusChangeCallback({
        timestamp: new Date().toISOString(),
        status: 'NO_FACE',
        description: 'No candidate visible in primary camera feed.',
      });
      return;
    }

    // Rule 2: Multiple Faces Detected
    if (results.faceLandmarks.length > 1) {
      this.onStatusChangeCallback({
        timestamp: new Date().toISOString(),
        status: 'MULTIPLE_FACES',
        description: `Alert: Detected ${results.faceLandmarks.length} individuals in frame.`,
      });
      return;
    }

    // Rule 3: Gaze Averted / Head Turned
    const landmarks = results.faceLandmarks[0];
    const noseTip = landmarks[1];
    const leftCheek = landmarks[234];
    const rightCheek = landmarks[454];

    const faceWidth = Math.abs(rightCheek.x - leftCheek.x);
    const noseRelativeX = (noseTip.x - leftCheek.x) / faceWidth;

    if (noseRelativeX < 0.15 || noseRelativeX > 0.85) {
      this.consecutiveOffScreenFrames++;
      if (this.consecutiveOffScreenFrames > 30) {
        this.onStatusChangeCallback({
          timestamp: new Date().toISOString(),
          status: 'GAZE_AVERTED',
          description: 'Candidate head turned away from screen.',
        });
      }
    } else {
      this.consecutiveOffScreenFrames = 0;
      this.onStatusChangeCallback({
        timestamp: new Date().toISOString(),
        status: 'FACE_PRESENT',
        description: 'Candidate in normal view.',
      });
    }
  }
}