import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { User, UserDocument } from './schemas/user.schema';
import { CreateUserDto } from './validation/dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private UserModel: Model<UserDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async create(user: CreateUserDto): Promise<UserDocument> {
    const newUser = new this.UserModel(user);
    newUser.password = await bcrypt.hash(newUser.password, 10);

    await newUser.save();

    const userObject = newUser.toObject();
    delete userObject.password;

    return userObject;
  }

  public async findById(id: string): Promise<UserDocument | null> {
    return this.UserModel.findById(id).exec();
  }

  public async findByEmail(email: string): Promise<UserDocument | null> {
    return this.UserModel.findOne({ email: email }).exec();
  }
}
