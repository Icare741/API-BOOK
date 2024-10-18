import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  register(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<User> {
    return this.usersService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() user: Partial<User>): Promise<User> {
    return this.usersService.update(+id, user as User);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<boolean> {
    return this.usersService.remove(+id);
  }
}
