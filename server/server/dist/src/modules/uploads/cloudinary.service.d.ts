import { ConfigService } from '@nestjs/config';
import { UploadApiResponse } from 'cloudinary';
export declare class CloudinaryService {
    private configService;
    constructor(configService: ConfigService);
    uploadImage(file: Express.Multer.File, folder: string): Promise<UploadApiResponse>;
    uploadVoiceNote(file: Express.Multer.File): Promise<UploadApiResponse>;
    deleteFile(publicId: string, resourceType?: 'image' | 'video'): Promise<void>;
}
