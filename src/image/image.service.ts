import { Injectable } from '@nestjs/common';
import * as sharp from 'sharp';

@Injectable()
export class ImageService {
  async processImage(file: Express.Multer.File) {
    if (!file) {
      throw new Error('No file uploaded');
    }
    
    const imageFormat = file.mimetype.split('/')[1];
    
    const supportedFormats = ['jpeg', 'png', 'webp', 'gif', 'tiff'];
        
    if (!supportedFormats.includes(imageFormat)) {
    throw new Error('Unsupported image format');
    }

    const outputBuffer = await sharp(file.buffer)
      .resize(3800, 3000)
      .toFormat(imageFormat as 'jpeg' | 'png' | 'webp' | 'gif' | 'tiff')
      .toBuffer();

    return {
      message: 'Image processed successfully',
      image: `data:image/jpeg;base64,${outputBuffer.toString('base64')}`,
    };
  }
}
