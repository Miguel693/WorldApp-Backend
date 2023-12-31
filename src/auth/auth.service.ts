import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
//* Importacion del paquete bcryptjs
import * as bcrypt from 'bcryptjs';

import { CreateUserDto,UpdateAuthDto,LoginDto, RegisterUserDto } from './dto';
import { User } from './entities/user.entity';
import { JwtPayload } from './interfaces/jwt.payload';
import { LoginResponse } from './interfaces/loginResponse';

@Injectable()
export class AuthService {

  constructor(
    @InjectModel( User.name )
    private userModel : Model<User>,
    private jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User>{
    try{
      const { password, ...userData } = createUserDto;

      const newUser = new this.userModel({
        password: bcrypt.hashSync( password, 10 ),
        ...userData
      });

      await newUser.save();
      const {password:_, ...user} = newUser.toJSON();

      return user;
    }catch (error){
      if(error.code === 11000)
        throw new BadRequestException(`${createUserDto.email} already exists `);
      throw new InternalServerErrorException('Something went wrong')
    }
  }

  async register(registerUserDto: RegisterUserDto) : Promise<LoginResponse>{

    const user = await this.create({
      email     : registerUserDto.email,
      name      : registerUserDto.name,
      password  : registerUserDto.password
    });

    return  {
      user : user,
      token: this.getJwtToken({id : user._id}),
    };


  }

  async login( loginDto: LoginDto ):Promise<LoginResponse> {

    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });
    if (( !user ) ||( !bcrypt.compareSync( password, user.password ) ))
      throw new UnauthorizedException('Not valid credentials');

    const { password:_, ...rest  } = user.toJSON();


    return {
      user: rest,
      token: this.getJwtToken({ id: user.id }),
    }

  }

  findAll() : Promise<User[]>{
    return this.userModel.find();
  }

  async findUserById(id : string){
    const user = await this.userModel.findById( id );
    const { password, ...rest} = user.toJSON();
    return rest;
  }

  findOne(id: string) {
    return `This action returns a #${id} auth`;
  }

  update(id: string, updateAuthDto: UpdateAuthDto) {
    return this.userModel.findByIdAndUpdate(id, updateAuthDto);
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id);
    // return `This action removes a #${id} auth`;
  }

  getJwtToken( payload: JwtPayload ) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
