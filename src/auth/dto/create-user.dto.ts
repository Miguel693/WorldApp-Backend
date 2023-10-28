import { IsEmail, IsString, MinLength } from "class-validator";
//* Esta clase valida los datos que son enviados a la base de datos
export class CreateUserDto {
  @IsEmail()
  email : string;
  @IsString()
  name : string;
  @MinLength(8)
  password : string;

}
