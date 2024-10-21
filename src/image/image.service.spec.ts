import { Test, TestingModule } from '@nestjs/testing';
import { ImageService } from './image.service';
import * as sharp from 'sharp';

jest.mock('sharp');

describe('ImageService', () => {
  let service: ImageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ImageService],
    }).compile();

    service = module.get<ImageService>(ImageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('processImage', () => {
    it('should throw an error if no file is uploaded', async () => {
      await expect(service.processImage(null)).rejects.toThrow('No file uploaded');
    });

    it('should throw an error if the image format is unsupported', async () => {
      const file = {
        mimetype: 'image/bmp',
        buffer: Buffer.from('test image'),
      } as Express.Multer.File;

      await expect(service.processImage(file)).rejects.toThrow('Unsupported image format');
    });

    it('should process the image and return it in base64 format', async () => {
      const file = {
        mimetype: 'image/jpeg',
        buffer: Buffer.from('test image'),
      } as Express.Multer.File;

      const mockSharp = sharp as jest.MockedFunction<typeof sharp>;
      mockSharp.mockReturnValue({
        resize: jest.fn().mockReturnThis(),
        toFormat: jest.fn().mockReturnThis(),
        toBuffer: jest.fn().mockResolvedValue(Buffer.from('processed image')),
      } as unknown as sharp.Sharp);

      const result = await service.processImage(file);

      expect(mockSharp).toHaveBeenCalledWith(file.buffer);
      expect(result).toEqual({
        message: 'Image processed successfully',
        image: `data:image/jpeg;base64,${Buffer.from('processed image').toString('base64')}`,
      });
    });
  });
});
