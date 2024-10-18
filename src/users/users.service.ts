import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  findOne(id: number): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }

  async create(user: Partial<User>): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = this.usersRepository.create({
      ...user,
      password: hashedPassword,
    });
    return this.usersRepository.save(newUser);
  }

  update(id: number, updatedUser: User): Promise<User> {
    return this.usersRepository.save({ ...updatedUser, id });
  }

  remove(id: number): Promise<boolean> {
    return this.usersRepository.delete(id).then(() => true);
  }

  findByUsername(username: string): Promise<User> {
    return this.usersRepository.findOne({ where: { username } });
  }

  async validateUser(username: string, password: string): Promise<User | null> {
    const user = await this.findByUsername(username);
    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async generateToken(user: User): Promise<string> {
    const token = crypto.randomBytes(64).toString('hex');
    user.token = token;
    await this.usersRepository.save(user);
    return token;
  }

  findByToken(token: string): Promise<User> {
    return this.usersRepository.findOne({ where: { token } });
  }
}
