import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { CreateBookDto } from './interfaces/dto/create-book.interface';
import { BookDocument } from './schemas/book.schema';
import { UpdateBookDto } from './interfaces/dto/update-book.interface';
import { IParamId } from './interfaces/param-id.interface';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  public async getAll() {
    return this.booksService.findAll();
  }

  @Post()
  public async create(@Body() body: CreateBookDto): Promise<BookDocument> {
    return this.booksService.create(body);
  }

  @Put(':id')
  public async update(
    @Param() { id }: IParamId,
    @Body() body: UpdateBookDto,
  ): Promise<BookDocument> {
    return this.booksService.update(id, body);
  }

  @Delete(':id')
  public async delete(@Param() { id }: IParamId): Promise<BookDocument> {
    return this.booksService.delete(id);
  }
}
