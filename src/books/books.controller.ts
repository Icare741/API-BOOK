import { Controller, Get, Post, Body, Put, Param, Delete, UseGuards } from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { AuthGuard } from '../auth/auth.guard';

@Controller('books')
@UseGuards(AuthGuard)
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  create(@Body() book: Partial<Book>): Promise<Book> {
    return this.booksService.create(book);
  }

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<Book> {
    return this.booksService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() book: Partial<Book>): Promise<Book> {
    return this.booksService.update(+id, book);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.booksService.remove(+id);
  }
}