import { Field, InputType } from '@nestjs/graphql';
import {
  IsDefined,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly firstName: string;

  @Field()
  @IsString()
  @IsDefined()
  @IsNotEmpty()
  readonly lastName: string;

  @Field()
  @IsString()
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  readonly email: string;

  @Field()
  @IsString()
  @IsEmail()
  @IsDefined()
  @IsNotEmpty()
  readonly password: string;

  @Field()
  @IsString()
  @IsDefined()
  @IsOptional()
  readonly phone: string;

  @Field()
  @IsString()
  @IsDefined()
  @IsOptional()
  readonly location: string;
}
