import { HttpException, HttpStatus, Res } from '@nestjs/common';
import {
  Args,
  Context,
  GraphQLExecutionContext,
  Mutation,
  Resolver,
} from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput } from './types/auth.login.types';
import { ExpressContext } from 'apollo-server-express';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation()
  async login(
    @Args('loginInput') loginInput: LoginInput,
    @Context() context: { res: ExpressContext['res'] },
  ): Promise<any> {
    try {
      return await this.authService.login(loginInput, context);
    } catch (error) {
      throw new HttpException(
        error.message || 'Internal Server Error',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
