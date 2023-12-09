import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { IsString, MinLength, minLength } from 'class-validator';

export class UpdateAuthDto extends PartialType(CreateUserDto) {
  @IsString()
  name ?: string;
  @MinLength(8)
  password?: string;
}
