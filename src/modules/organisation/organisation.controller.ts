import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { CreateOrgInput } from './types/organisation.create.types';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('organisation')
export class OrganisationController {
  constructor(private readonly orgService: OrganisationService) {}

  @Post()
  @Post('upload')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 2 }]))
  async createOrg(
    @Body() orgInput: CreateOrgInput,
    @UploadedFiles() files: { images: Express.Multer.File[] },
  ) {
    try {
      return await this.orgService.createOrg(orgInput, files);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
