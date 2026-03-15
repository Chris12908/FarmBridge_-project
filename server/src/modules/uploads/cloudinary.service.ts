import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';

@Injectable()
export class CloudinaryService {
  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: configService.getOrThrow<string>('cloudinary.cloudName'),
      api_key: configService.getOrThrow<string>('cloudinary.apiKey'),
      api_secret: configService.getOrThrow<string>('cloudinary.apiSecret'),
    });
  }

  async uploadImage(
    file: Express.Multer.File,
    folder: string,
  ): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: `farm-bridge/${folder}`,
          resource_type: 'image',
          quality: 'auto',
          fetch_format: 'auto',
          width: 1200,
          crop: 'limit',
        },
        (error, result) => {
          if (error || !result)
            return reject(
              error instanceof Error
                ? error
                : new InternalServerErrorException('Upload failed'),
            );
          resolve(result);
        },
      );
      uploadStream.end(file.buffer);
    });
  }

  async uploadVoiceNote(file: Express.Multer.File): Promise<UploadApiResponse> {
    return new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        {
          folder: 'farm-bridge/voice-notes',
          resource_type: 'video', // Cloudinary uses 'video' for audio
          format: 'mp3',
        },
        (error, result) => {
          if (error || !result)
            return reject(
              error instanceof Error
                ? error
                : new InternalServerErrorException('Upload failed'),
            );
          resolve(result);
        },
      );
      uploadStream.end(file.buffer);
    });
  }

  async deleteFile(
    publicId: string,
    resourceType: 'image' | 'video' = 'image',
  ): Promise<void> {
    await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
  }
}
