import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ProfessionService } from './profession.service';
import { HttpException, HttpStatus } from '@nestjs/common';
import { CreateProfessionInput } from './types/profession.create.types';

@Resolver()
export class ProfessionResolver {
  constructor(private readonly professionService: ProfessionService) {}

  @Mutation()
  async createProfession(
    @Args('professionInput') professionInput: CreateProfessionInput,
  ): Promise<any> {
    try {
      return await this.professionService.createProfession(professionInput);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query()
  async getProfessions(): Promise<any> {
    try {
      return await this.professionService.getProfessions();
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  @Query()
  async getProfession(@Args('id') id: string): Promise<any> {
    try {
      return await this.professionService.getProfession(id);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
