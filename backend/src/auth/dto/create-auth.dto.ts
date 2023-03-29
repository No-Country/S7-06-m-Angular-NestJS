import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateAuthDto {
  @ApiProperty({
    description: 'User email (unique)',
    nullable: false,
    minLength: 1,
    default: 'user@email.com',
  })
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'User password',
    nullable: false,
    minLength: 8,
    default: 'Abcd123@',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(40)
  @Matches(
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,40}$/,
    {
      message:
        'The password must have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character',
    },
  )
  password: string;

  @ApiProperty({
    description: 'User first name',
    nullable: false,
    minLength: 1,
    default: 'FirstName',
  })
  @IsString()
  @MinLength(1)
  firstName: string;

  @ApiProperty({
    description: 'User last name',
    nullable: false,
    minLength: 1,
    default: 'LastName',
  })
  @IsString()
  @MinLength(1)
  lastName: string;
}
