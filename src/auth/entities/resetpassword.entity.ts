import { Entity } from 'typeorm';
import { PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('resetPassword')
export class ResetPassword {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty()
  @Column('text')
  email: string;

  @ApiProperty()
  @Column('text')
  token: string;
}
