import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginUserInput {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
