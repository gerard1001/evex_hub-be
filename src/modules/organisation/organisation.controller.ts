import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { CreateOrgInput } from './types/organisation.create.types';
import {
  AnyFilesInterceptor,
  FileFieldsInterceptor,
} from '@nestjs/platform-express';
import { OrgPrfnInput } from 'src/database/graphql/graphql';

@Controller('organisation')
export class OrganisationController {
  constructor(private readonly orgService: OrganisationService) {}

  @Post()
  @UseInterceptors(AnyFilesInterceptor())
  // @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 3 }]))
  async createOrg(
    @Body() orgInput: CreateOrgInput,
    // @UploadedFiles() files: { images: Express.Multer.File[] },
    @UploadedFiles() files: Express.Multer.File[],
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

  @Patch()
  @UseInterceptors(FileFieldsInterceptor([{ name: 'images', maxCount: 2 }]))
  async linkProfession(
    @Body() orgPrfnInput: OrgPrfnInput,
    @UploadedFiles() files: { images: Express.Multer.File[] },
  ) {
    try {
      return await this.orgService.linkProfession(orgPrfnInput, files);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
