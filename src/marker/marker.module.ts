import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { MarkerController } from './marker.controller';
import { MarkerService } from './marker.service';
import { Marker, MarkerSchema } from './entities/marker.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({

  imports:[
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name : Marker.name, schema : MarkerSchema}]),

  ],
  controllers :[ MarkerController],
  providers : [MarkerService],
})
export class MarkerModule {

}
