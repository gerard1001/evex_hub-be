import { Query, Resolver, Args } from '@nestjs/graphql';
import { HttpException, HttpStatus } from '@nestjs/common';
import { OrganisationService } from './organisation.service';

@Resolver()
export class OrganisationResolver {
  constructor(private readonly orgService: OrganisationService) {}

  @Query()
  async getOrgs(): Promise<any> {
    try {
      return await this.orgService.getOrgs();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query()
  async getOrg(@Args('id') id: string): Promise<any> {
    try {
      return await this.orgService.getOrg(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
