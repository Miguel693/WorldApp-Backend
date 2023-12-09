/**
 ** Esta clase tiene los datos que se guardan en la base de datos
 *
 *
 */
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

import { Roles } from "../interfaces/roles.enum";
import { Marker } from "../interfaces/marker.interface";

@Schema()
export class User {

  _id ?: string;
  @Prop({unique: true, required: true,})
  email : string;

  @Prop({ required: true})
  name : string;

  @Prop({ required: true, minlength: 8})
  password ?: string;

  @Prop({ default: true,})
  isActive : boolean;

  @Prop({ type: [String], default: "user"})
  roles : Roles[];

  @Prop()
  pines : Marker[];
}

export const UserSchema = SchemaFactory.createForClass( User );
