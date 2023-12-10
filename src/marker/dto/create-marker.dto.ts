import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateMarkerDto {
  @IsString()
  name : string;
  @IsNumber()
  @Type(()=> Number)
  latitude : number;
  @IsNumber()
  @Type(()=> Number)
  longitude : number;
  @IsString()
  description : string;
  @IsString()
  user_id : string;
}
