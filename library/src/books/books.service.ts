import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateBookDto } from './interfaces/dto/create-book.interface';
import { Book, BookDocument } from './schemas/book.schema';
import { UpdateBookDto } from './interfaces/dto/update-book.interface';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private BookModel: Model<BookDocument>) {}

  public async create(book: CreateBookDto): Promise<BookDocument> {
    const newBook = new this.BookModel(book);

    return newBook.save();
  }

  public async findAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
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
