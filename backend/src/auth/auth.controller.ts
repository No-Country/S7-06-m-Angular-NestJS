import { Body, Controller, Get, Post } from '@nestjs/common';

import { User } from './entities/auth.entity';

import { AuthService } from './auth.service';
import { CreateAuthDto, LoginUserDto } from './dto';
import { Roles } from './interfaces';
import { Auth, GetUser } from './decorators';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

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

  @Get('private')
  @Auth(Roles.Admin)
  privateRoute(@GetUser() user: User) {
    return {
      ok: true,
      user,
    };
  }
}
