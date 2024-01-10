import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './validation/dto/create-book.dto';
import { UpdateBookDto } from './validation/dto/update-book.dto';
import { ObjectidValidationPipe } from '../pipes/objectid.validation.pipe';
import { ValidationCustomPipe } from '../pipes/validation.custom.pipe';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  public async getAll(): Promise<BookDocument[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  public async getById(
    @Param('id', ObjectidValidationPipe) id: string,
  ): Promise<BookDocument> {
    return this.booksService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  public async create(
    @Body(ValidationCustomPipe) body: CreateBookDto,
  ): Promise<BookDocument> {
    return this.booksService.create(body);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  public async update(
    @Param('id', ObjectidValidationPipe) id: string,
    @Body(ValidationCustomPipe) body: UpdateBookDto,
  ): Promise<BookDocument> {
    return this.booksService.update(id, body);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  public async delete(
    @Param('id', ObjectidValidationPipe) id: string,
  ): Promise<BookDocument> {
    return this.booksService.delete(id);
  }
}
