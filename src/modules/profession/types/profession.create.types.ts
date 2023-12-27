import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsString } from 'class-validator';

@InputType()
export class CreateProfessionInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly name: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly description: string;
}
