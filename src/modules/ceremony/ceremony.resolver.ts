import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CeremonyService } from './ceremony.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CeremonyInput } from 'src/database/graphql/graphql';

@Resolver()
export class CeremonyResolver {
  constructor(private readonly ceremonyService: CeremonyService) {}

  @Mutation()
  async createCeremony(
    @Args('ceremonyInput') ceremonyInput: CeremonyInput,
  ): Promise<any> {
    try {
      return await this.ceremonyService.createCeremony(ceremonyInput);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Mutation()
  async deleteCeremonies(): Promise<IResponse> {
    try {
      return await this.ceremonyService.deleteCeremonies();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
