import { Field, InputType } from '@nestjs/graphql';
import { IsDefined, IsNotEmpty, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateEventInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  @IsDefined()
  readonly type: string;

  @Field()
  @IsString()
  @IsOptional()
  @IsDefined()
  readonly prfnIds: string;
}
