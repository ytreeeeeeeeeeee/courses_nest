import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  BookComment,
  BookCommentDocument,
} from './schemas/book-comment.schema';
import { Model } from 'mongoose';
import { CreateBookCommentDto } from './validation/dto/create-book-comment.dto';
import { UpdateBookCommentDto } from './validation/dto/update-book-comment.dto';

@Injectable()
export class BookCommentsService {
  constructor(
    @InjectModel(BookComment.name)
    private BookCommentModel: Model<BookCommentDocument>,
  ) {}

  public async create(
    comment: CreateBookCommentDto,
  ): Promise<BookCommentDocument> {
    const newComment = new this.BookCommentModel(comment);
    return newComment.save();
  }

  public async findById(id: string): Promise<BookCommentDocument | null> {
    return this.BookCommentModel.findById(id).exec();
  }

  public async update(
    id: string,
    data: UpdateBookCommentDto,
  ): Promise<BookCommentDocument | null> {
    return this.BookCommentModel.findByIdAndUpdate(id, data, {
      new: true,
    }).exec();
  }

  public async delete(id: string): Promise<BookCommentDocument | null> {
    return this.BookCommentModel.findOneAndDelete({ _id: id }).exec();
  }

  public async findAllBookComments(
    bookId: string,
  ): Promise<BookCommentDocument[]> {
    return this.BookCommentModel.find({ bookId }).exec();
  }
}
