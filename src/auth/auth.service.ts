import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { transporter } from 'src/config/transporter';
import * as bcrypt from 'bcrypt';

import { User } from './entities/auth.entity';
import { CreateAuthDto, LoginUserDto } from './dto';
import { JwtPayload } from './interfaces';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ResetPassword } from './entities/resetpassword.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly authRepository: Repository<User>,

    @InjectRepository(ResetPassword)
    private readonly resetPasswordRepository: Repository<ResetPassword>,

    private readonly jwtService: JwtService,
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

      // await transporter.sendMail({
      //   to: 'bryandavidaaa@gmail.com',
      //   from: 'jobsmatch23@gmail.com',
      //   subject: 'confirme su email',
      //   html: '<h1>recuperar contraseña</h1>',
      // });

      return { ...user, token: this.getJwtToken({ id: user.id }) };
    } catch (error) {
      this.handleDBError(error);
    }
  }

  async update(id: string, updateUserDto: UpdateAuthDto) {
    const user = this.authRepository.findOne({ where: { id } });
    if (!user) {
      throw new UnauthorizedException('User not login');
    }
    const update = await this.authRepository.preload({ id, ...updateUserDto });
    this.authRepository.save(update);
    return update;
  }

  async login(loginUserDto: LoginUserDto) {
    const { email, password } = loginUserDto;

    const user = await this.authRepository.findOne({
      where: { email },
      select: {
        email: true,
        password: true,
        id: true,
        firstName: true,
        lastName: true,
        roles: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException('Credential are not valid (email)');
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException('Credential are not valid (password)');
    }

    delete user.password;

    return { ...user, token: this.getJwtToken({ id: user.id }) };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  async forgot(email: string) {
    const token = Math.random().toString(20).substring(2, 12);
    const user = await this.authRepository.findOne({ where: { email } });

    if (!user) throw new BadRequestException('Email dont exist');

    const reset = this.resetPasswordRepository.create({ email, token });
    await this.resetPasswordRepository.save(reset);

    const url = `https://mimustore.vercel.app/mimu/resetpassword/${token}`;

    await transporter.sendMail({
      to: email,
      from: 'jobsmatch23@gmail.com',
      subject: 'Reset your password',
      html: `<h1>recuperar contraseña</h1> <a href="${url}">Reset here</a>`,
    });

    return { message: 'Please check your email' };
  }

  async reset(token: string, password: string, confirmed_password: string) {
    if (password !== confirmed_password)
      throw new BadRequestException('Password dont match');

    const passwordReset = await this.resetPasswordRepository.findOne({
      where: { token },
    });
    console.log(passwordReset);
    const user = await this.authRepository.findOne({
      where: { email: passwordReset.email },
    });

    if (!user) throw new BadRequestException('user not found');

    const hashPassword = await bcrypt.hash(password, 10);

    await this.authRepository.update(user.id, { password: hashPassword });

    return { message: 'Password changed successfully' };
  }

  private handleDBError(error: any): never {
    if (error.code === '23505') throw new BadRequestException(error.detail);

    console.log(error);

    throw new InternalServerErrorException('Please check your logs');
  }
}
