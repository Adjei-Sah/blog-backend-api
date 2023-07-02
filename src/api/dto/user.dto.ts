/* eslint-disable @typescript-eslint/indent */
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;
}

export class LoginDTO {
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @MinLength(8)
  password!: string; 
}