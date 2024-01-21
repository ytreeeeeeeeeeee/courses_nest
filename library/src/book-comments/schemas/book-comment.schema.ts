import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Types } from 'mongoose';

import { Book } from '../../books/schemas/book.schema';

export type BookCommentDocument = BookComment & Document;

@Schema({ versionKey: false })
export class BookComment {
  @Prop({ type: Types.ObjectId, required: true, ref: Book.name })
  public bookId: Book;

  @Prop({ required: true })
  public comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
