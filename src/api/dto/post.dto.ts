/* eslint-disable @typescript-eslint/indent */
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreatePostDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title!: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  content!: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  summary!: string;

  @IsNotEmpty()
  @IsUUID()
  user!: string;
  
}

export class UpdatePostDTO {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  title?: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  content?: string;
  
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  summary?: string;

  @IsNotEmpty()
  @IsUUID()
  user!: string;
  
}