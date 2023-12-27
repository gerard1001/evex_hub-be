import { Query, Resolver, Args, Mutation } from '@nestjs/graphql';
import { HttpException, HttpStatus } from '@nestjs/common';
import { OrganisationService } from './organisation.service';
import { OrgPrfnInput } from 'src/database/graphql/graphql';

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

  @Mutation()
  async linkProfession(
    @Args('orgPrfnInput') orgPrfnInput: OrgPrfnInput,
  ): Promise<any> {
    try {
      return await this.orgService.linkProfession(orgPrfnInput);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
