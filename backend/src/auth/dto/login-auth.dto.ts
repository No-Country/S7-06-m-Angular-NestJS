import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
  } from 'class-validator';

export class LoginUserDto{
    @IsString()
    @IsEmail()
    email: string;
  
    @IsString()
    @MinLength(6)
    @MaxLength(40)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
      message: 'La contraseña debe tener una Mayúscula, minúscula y un número',
    })
    password: string;
}