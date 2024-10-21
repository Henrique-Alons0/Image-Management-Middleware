import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Request } from 'express';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: AppService,
          useValue: {
            getHello: jest.fn().mockReturnValue('Hello World!'),
            ping: jest.fn().mockImplementation((request: Request, timestamp: number) => ({
              status: 'available',
              timestamp,
              url: request.url,
            })),
          },
        },
      ],
    }).compile();

    appController = module.get<AppController>(AppController);
    appService = module.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('ping', () => {
    it('should return a ping response', () => {
      const mockRequest = {
        url: '/ping',
      } as Request;

      const result = appController.ping(mockRequest);
      expect(result).toEqual({
        status: 'available',
        timestamp: expect.any(Number),
        url: '/ping',
      });
    });
  });
});
