import { useState } from 'react';
import { uploadService } from '@/services/upload.service';
import type { ResourceType, UploadResponse } from '@/lib/types/upload.types';

export function useUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<unknown>(null);

  async function uploadImage(file: File): Promise<UploadResponse | null> {
    setIsUploading(true);
    setProgress(0);
    setError(null);
    try {
      const result = await uploadService.uploadImage(file, (pct) =>
        setProgress(pct)
      );
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setIsUploading(false);
    }
  }

  async function uploadVoiceNote(file: File): Promise<UploadResponse | null> {
    setIsUploading(true);
    setProgress(0);
    setError(null);
    try {
      const result = await uploadService.uploadVoiceNote(file, (pct) =>
        setProgress(pct)
      );
      return result;
    } catch (err) {
      setError(err);
      return null;
    } finally {
      setIsUploading(false);
    }
  }

  async function deleteUpload(
    publicId: string,
    resourceType: ResourceType = 'image'
  ): Promise<void> {
    await uploadService.deleteUpload(publicId, resourceType);
  }

  return { uploadImage, uploadVoiceNote, deleteUpload, isUploading, progress, error };
}
