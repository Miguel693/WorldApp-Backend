import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // localhost:27017 el puerto de docker
    ConfigModule.forRoot(),
    MongooseModule.forRoot( process.env.MONGO_URI),


    AuthModule,

  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
