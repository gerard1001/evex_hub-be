import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

export class LoginInput {
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly password: string;
}
