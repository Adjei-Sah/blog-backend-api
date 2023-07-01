/* eslint-disable @typescript-eslint/indent */
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  @MinLength(3, {
    message: 'Name must be more than 3 characters',
  })
  name!: string;

  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be more than 8 characters',
  })
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
  @MinLength(8, {
    message: 'Password must be more than 8 characters',
  })
  password!: string; 
}