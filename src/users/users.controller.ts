import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serlize } from '../interceptors/serilaize.interceptor';
import { UserInfoDto } from './dtos/user-info.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/custom-user.docerator';
import { User } from './user.entity';
import { AuthGurad } from '../Guards/users.gurds';

@Controller('auth')
export class UsersController {
  constructor(
    private userService: UsersService,
    private authSerivce: AuthService,
  ) {}

  @Get('/me')
  @UseGuards(AuthGurad)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    return this.authSerivce.signup(body.email, body.password);
  }

  @Post('/signin')
  async login(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authSerivce.signin(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Serlize(UserInfoDto)
  @Get('/:id')
  findOne(@Param('id') id: string) {
    console.log('iam in handler');
    return this.userService.findOne(parseInt(id));
  }

  @Get()
  findUsers(@Query('email') email: string) {
    return this.userService.findUsers(email);
  }

  @Delete('/:id')
  delete(@Param('id') id: string) {
    this.userService.remove(parseInt(id));
    return 'Deleted';
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }
}
