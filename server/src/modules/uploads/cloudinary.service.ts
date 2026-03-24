import { Injectable } from '@nestjs/common';
import { writeFile, mkdir, unlink } from 'fs/promises';
import { join, extname } from 'path';
import { randomUUID } from 'crypto';

interface UploadResult {
  secure_url: string;
  public_id: string;
  duration?: number;
}

@Injectable()
export class CloudinaryService {
  private readonly uploadsDir = join(process.cwd(), 'uploads');
  private readonly baseUrl =
    process.env.SERVER_BASE_URL || 'http://localhost:3001';

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadResult> {
    const dir = join(this.uploadsDir, 'images', folder);
    await mkdir(dir, { recursive: true });
    const ext = extname(file.originalname) || '.jpg';
    const filename = `${randomUUID()}${ext}`;
    await writeFile(join(dir, filename), file.buffer);
    const publicId = `images/${folder}/${filename}`;
    return {
      secure_url: `${this.baseUrl}/api/uploads/files/${publicId}`,
      public_id: publicId,
    };
  }

  async uploadVoiceNote(file: Express.Multer.File): Promise<UploadResult> {
    const dir = join(this.uploadsDir, 'voice-notes');
    await mkdir(dir, { recursive: true });
    const ext = extname(file.originalname) || '.mp3';
    const filename = `${randomUUID()}${ext}`;
    await writeFile(join(dir, filename), file.buffer);
    const publicId = `voice-notes/${filename}`;
    return {
      secure_url: `${this.baseUrl}/api/uploads/files/${publicId}`,
      public_id: publicId,
    };
  }

  async deleteFile(
    publicId: string,
    _resourceType: 'image' | 'video' = 'image',
  ): Promise<void> {
    try {
      await unlink(join(this.uploadsDir, publicId));
    } catch {
      // File may not exist, ignore
    }
  }
}
