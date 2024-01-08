import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { PasswordHelper } from 'src/helpers/password.helper';
import { JwtDynamicModule } from './modules/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { AuthHelper } from 'src/helpers/auth.helper';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtDynamicModule.forRoot(),
    forwardRef(() => UserModule),
  ],
  providers: [AuthResolver, AuthService, PasswordHelper, AuthHelper],
  exports: [PasswordHelper, AuthHelper],
})
export class AuthModule {}
