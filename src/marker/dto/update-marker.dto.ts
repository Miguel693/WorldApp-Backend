import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";
import { CreateMarkerDto } from "./create-marker.dto";

export class UpdateMarkerDto extends PartialType( CreateMarkerDto ){
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
