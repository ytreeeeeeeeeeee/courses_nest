import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';

import { Book, BookDocument } from './schemas/book.schema';
import { CreateBookDto } from './validation/dto/create-book.dto';
import { UpdateBookDto } from './validation/dto/update-book.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private BookModel: Model<BookDocument>,
    @InjectConnection() private connection: Connection,
  ) {}

  public async create(book: CreateBookDto): Promise<BookDocument> {
    const newBook = new this.BookModel(book);

    return newBook.save();
  }

  public async findAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  public async findById(id: string): Promise<BookDocument> {
    const book = await this.BookModel.findById(id).exec();
    if (!book) {
      throw new BadRequestException('There is no such book');
    }

    return book;
  }

  public async update(id: string, data: UpdateBookDto): Promise<BookDocument> {
    return this.BookModel.findOneAndUpdate({ _id: id }, data, {
      new: true,
    }).exec();
  }

  public async delete(id: string): Promise<BookDocument> {
    return this.BookModel.findOneAndDelete({ _id: id }).exec();
  }
}
