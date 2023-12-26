import { IsArray, IsDefined, IsOptional, IsString } from 'class-validator';

export class CreateOrgInput {
  @IsString()
  @IsDefined()
  readonly name: string;

  @IsString()
  @IsDefined()
  readonly type: string;

  @IsString()
  @IsDefined()
  readonly email: string;

  @IsString()
  @IsDefined()
  readonly phone: string;

  @IsString()
  @IsDefined()
  readonly location: string;

  @IsString()
  @IsOptional()
  readonly media: string;
}
