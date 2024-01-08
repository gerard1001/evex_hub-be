import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { PasswordHelper } from 'src/helpers/password.helper';
import { LoginInput } from './types/auth.login.types';
import { GraphQLExecutionContext } from '@nestjs/graphql';
import { ExpressContext } from 'apollo-server-express';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordHelper: PasswordHelper,
  ) {}

  async login(
    loginInput: LoginInput,
    context: { res: ExpressContext['res'] },
  ): Promise<IResponse> {
    const { email, password } = loginInput;
    const user = await this.userService.getByEmail(email);
    const verifyPassword = await this.passwordHelper.comparePassword(
      password,
      user?.password,
    );

    if (!user || !verifyPassword) {
      throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
    }
    context.res.cookie('token', 'user1001', {});
    return {
      statusCode: HttpStatus.OK,
      message: 'Login successful',
      data: {
        user,
      },
    };
  }
}
