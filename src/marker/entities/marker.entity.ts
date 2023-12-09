import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";

@Schema()
export class Marker {

  _id ?: number;
  @Prop({required: true, type: String})
  name ?: string;

  @Prop({ required: true, type : Number})
  @Type(()=> Number)
  latitude ?: number;

  @Prop({ required: true, type: Number})
  @Type(()=> Number)
  longitude ?: number;

  @Prop({ required: true, type: String})
  description ?: string;


}

export const MarkerSchema = SchemaFactory.createForClass( Marker );
