import { Controller, Get, Req} from '@nestjs/common';
import { AppService, TPingResponse } from './app.service';
import { Request } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/ping')
  ping(@Req() request: Request): TPingResponse {
    return this.appService.ping(request, Date.now());
  }
}
