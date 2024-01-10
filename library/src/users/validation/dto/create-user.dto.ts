import { IsDefined, IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  @IsDefined()
  public email: string;

  @IsString()
  @IsDefined()
  public password: string;

  @IsString()
  @IsDefined()
  public firstName: string;

  @IsString()
  @IsDefined()
  public lastName: string;
}
