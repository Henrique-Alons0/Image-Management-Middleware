import { Test, TestingModule } from '@nestjs/testing';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { AppService } from '../app.service';
import { BadRequestException } from '@nestjs/common';

describe('ImageController', () => {
  let controller: ImageController;
  let imageService: ImageService;
  let appService: AppService;

  const mockAppService = {
    ping: jest.fn(),
  };

  const mockImageService = {
    processImage: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ImageController],
      providers: [
        { provide: ImageService, useValue: mockImageService },
        { provide: AppService, useValue: mockAppService },
      ],
    }).compile();

    controller = module.get<ImageController>(ImageController);
    imageService = module.get<ImageService>(ImageService);
    appService = module.get<AppService>(AppService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('ping', () => {
    it('should return the response from appService.ping', async () => {
      const request = {} as any; // Mock request object
      const timestamp = Date.now();
      mockAppService.ping.mockReturnValue('pong');

      const result = await controller.ping(request);

      expect(appService.ping).toHaveBeenCalledWith(request, timestamp);
      expect(result).toEqual('pong');
    });
  });

  describe('uploadImage', () => {
    it('should throw BadRequestException if no file is uploaded', async () => {
      await expect(controller.uploadImage(null)).rejects.toThrow(BadRequestException);
      await expect(controller.uploadImage(null)).rejects.toMatchObject({
        response: {
          statusCode: 400,
          message: 'No file uploaded. Please provide a valid image file.',
          error: 'Bad Request',
        },
      });
    });

    it('should call imageService.processImage with the uploaded file', async () => {
      const file = { buffer: Buffer.from('test image') } as Express.Multer.File;
      mockImageService.processImage.mockReturnValue({ message: 'Image processed successfully' });

      const result = await controller.uploadImage(file);

      expect(imageService.processImage).toHaveBeenCalledWith(file);
      expect(result).toEqual({ message: 'Image processed successfully' });
    });
  });
});
