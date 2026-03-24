import {
  BadRequestException,
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {
  ApiBearerAuth,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { memoryStorage } from 'multer';
import { CloudinaryService } from './cloudinary.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@ApiTags('uploads')
@ApiBearerAuth('JWT')
@UseGuards(JwtAuthGuard)
@Controller('uploads')
export class UploadsController {
  constructor(private cloudinaryService: CloudinaryService) {}

  @Post('image')
  @ApiOperation({ summary: 'Upload an image (max 5MB)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 5 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('image/')) {
          return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Query('folder') folder: string = 'general',
  ) {
    if (!file) throw new BadRequestException('No file provided');
    const result = await this.cloudinaryService.uploadImage(file, folder);
    return { url: result.secure_url, publicId: result.public_id };
  }

  @Post('voice-note')
  @ApiOperation({ summary: 'Upload a voice note (max 50MB)' })
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: memoryStorage(),
      limits: { fileSize: 50 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.startsWith('audio/')) {
          return cb(new Error('Only audio files are allowed'), false);
        }
        cb(null, true);
      },
    }),
  )
  async uploadVoiceNote(@UploadedFile() file: Express.Multer.File) {
    if (!file) throw new BadRequestException('No file provided');
    const result = await this.cloudinaryService.uploadVoiceNote(file);
    return {
      url: result.secure_url,
      publicId: result.public_id,
      duration: result.duration as number | undefined,
    };
  }

  @Delete(':publicId')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Delete a file from Cloudinary' })
  async deleteFile(
    @Param('publicId') publicId: string,
    @Query('resourceType') resourceType: 'image' | 'video' = 'image',
  ) {
    await this.cloudinaryService.deleteFile(publicId, resourceType);
    return { message: 'File deleted' };
  }
}
