import { Test, TestingModule } from '@nestjs/testing';
import { AppService, TPingResponse } from './app.service';
import { Request } from 'express';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  describe('getHello', () => {
    it('should return "Hello World!"', () => {
      expect(appService.getHello()).toBe('Hello World!');
    });
  });

  describe('ping', () => {
    it('should return a ping response with the correct URL and response time', () => {
      const mockRequest = {
        protocol: 'http',
        get: jest.fn().mockReturnValue('localhost:3000'),
        originalUrl: '/ping',
      } as unknown as Request;

      const startTime = Date.now();
      
      setTimeout(() => {
        const result: TPingResponse = appService.ping(mockRequest, startTime);
        expect(result.message).toBe('Available endpoint!');
        expect(result.url).toBe('http://localhost:3000/ping');
        expect(result.responseTime).toMatch(/ms$/);
      }, 100);
    });
  });
});
