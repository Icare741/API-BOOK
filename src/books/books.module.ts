import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';
import { Book } from './book.entity';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module'; // Ajoutez cette ligne

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    UsersModule,
    AuthModule, // Ajoutez cette ligne
  ],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}