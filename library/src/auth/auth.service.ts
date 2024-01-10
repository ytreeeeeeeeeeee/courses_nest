import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { UsersService } from '../users/users.service';
import { UserDocument } from 'src/users/schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (user) {
      const passVerify = await bcrypt.compare(password, user.password);
      if (passVerify) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }

  public async login(user: UserDocument) {
    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
