import { Body, Controller, Get, Post, Req,Patch,Param,ParseUUIDPipe } from '@nestjs/common';
import { User } from './entities/auth.entity';

import { AuthService } from './auth.service';
import { CreateAuthDto, LoginUserDto } from './dto';
import { Roles } from './interfaces';
import { Auth, GetUser } from './decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UpdateAuthDto } from './dto/update-auth.dto';
import path from 'path';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({ status: 201, description: 'User was create', type: User })
  @ApiResponse({
    status: 400,
    description: 'Bad request (user already exists)',
  })
  @Post('register')
  createUser(@Body() createUserDto: CreateAuthDto) {
    return this.authService.create(createUserDto);
  }

  @ApiResponse({ status: 201, description: 'User was logged', type: User })
  @ApiResponse({
    status: 400,
    description: 'Bad request (email or password are wrong)',
  })
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @ApiResponse({status:201,description:"User updated!",type:User})
  @ApiResponse({
    status: 400,
    description: 'Bad request (data are wrong)',
  })
  @Patch("update/:id")
  updateUser(
    @Param("id",ParseUUIDPipe) id:string,
    @Body()updateUserDto:UpdateAuthDto,
    ){
    return this.authService.update(id,updateUserDto)
  }

  @Get('private')
  @Auth(Roles.Admin)
  privateRoute(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
