import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';

import { AuthService } from '../auth/auth.service';
import { LocalAuthGuard } from '../auth/local-auth.guard';
import { CreateUserDto } from './validation/dto/create-user.dto';
import { UsersService } from './users.service';
import { UserDocument } from './schemas/user.schema';
import { ValidationCustomPipe } from '../pipes/validation.custom.pipe';

@Controller('api/users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  public async login(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }

  @Post('signup')
  public async signup(
    @Body(ValidationCustomPipe) user: CreateUserDto,
  ): Promise<UserDocument> {
    return this.usersService.create(user);
  }
}
