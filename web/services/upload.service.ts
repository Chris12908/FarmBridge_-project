import { uploadToServer } from '@/lib/axios';
import axiosClient from '@/lib/axios';
import type { ResourceType, UploadResponse } from '@/lib/types/upload.types';

export const uploadService = {
  async uploadImage(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await uploadToServer(
      '/uploads/image',
      formData,
      onProgress
    );
    return data as UploadResponse;
  },

  async uploadVoiceNote(
    file: File,
    onProgress?: (percent: number) => void
  ): Promise<UploadResponse> {
    const formData = new FormData();
    formData.append('file', file);
    const { data } = await uploadToServer(
      '/uploads/voice-note',
      formData,
      onProgress
    );
    return data as UploadResponse;
  },

  async deleteUpload(
    publicId: string,
    resourceType: ResourceType = 'image'
  ): Promise<void> {
    await axiosClient.delete(
      `/uploads/${encodeURIComponent(publicId)}?resourceType=${resourceType}`
    );
  },
};
