import { Controller, Post, Get, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { AppService } from '../app.service';
import { Request } from 'express';

@Controller('image')
export class ImageController {
    constructor(private readonly imageService: ImageService, private readonly appService: AppService) {}

    @Get('ping')
    async ping(
        @Req() request: Request
    ){
        return this.appService.ping(request, Date.now());
    }

    @Post('upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        if (!file) {
            throw new BadRequestException({
                statusCode: 400,
                message: 'No file uploaded. Please provide a valid image file.',
                error: 'Bad Request',
            });
        }
        return this.imageService.processImage(file);
    }
}
