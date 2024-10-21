import { Injectable } from '@nestjs/common';
import { Request } from 'express';

export type TPingResponse = { 
  message: string, url: string, responseTime: string 
};

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  ping(request: Request, startTime: any): TPingResponse {
    const responseTime = Date.now() - startTime;
    const fullUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
    return {
        message: 'Available endpoint!',
        url: fullUrl,
        responseTime: `${responseTime}ms`
    };
  }
}