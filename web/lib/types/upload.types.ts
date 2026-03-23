// ─── Upload ───────────────────────────────────────────────────────────────────

export interface UploadResponse {
  url: string;
  publicId: string;
  duration?: number;
}

export type ResourceType = 'image' | 'video' | 'raw';
