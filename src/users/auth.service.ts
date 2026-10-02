import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(public userSerice: UsersService) {}

  async signup(email: string, password: string) {
    const users = await this.userSerice.findUsers(email);
    if (users.length) throw new BadRequestException('Email is Already Exist');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await this.userSerice.createUser(email, hashedPassword);

    return newUser;
  }

  async signin(email: string, password: string) {
    const [users] = await this.userSerice.findUsers(email);
    if (!users) throw new NotFoundException('User Not Found');

    const isValidPassword = await bcrypt.compare(password, users.password);

    if (!isValidPassword) throw new BadRequestException('Invalid Cerdetionals');

    return users;
  }
}
