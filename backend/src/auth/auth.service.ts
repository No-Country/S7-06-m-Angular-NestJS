import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as bcrypt from 'bcrypt';
import { Auth } from './entities/auth.entity';

import { CreateAuthDto,LoginUserDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Auth)
    private readonly authRepository: Repository<Auth>,
  ) {}

  async create(createAuthDto: CreateAuthDto) {
    try {
      const { password, ...userData } = createAuthDto;

      const user = this.authRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });

      await this.authRepository.save(user);
      delete user.password;

      return user;
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async login(loginUserDto:LoginUserDto){

     const{email,password}=loginUserDto
     const user=await this.authRepository.findOne({where:{email},select:{email:true,password:false,id:true}})
     if(!user){
      throw new UnauthorizedException("Error invalidated credentials")
     }
     if(!bcrypt.compareSync(password,user.password)){
      throw new UnauthorizedException("Error invalidated password")
     }
     return user

  }




  private handleDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check your logs');
  }
}
