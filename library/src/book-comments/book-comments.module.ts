import { Module } from '@nestjs/common';
import { BookCommentsService } from './book-comments.service';
import { MongooseModule } from '@nestjs/mongoose';

import { BookComment, BookCommentSchema } from './schemas/book-comment.schema';
import { BookCommentsGateway } from './book-comments.gateway';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: BookComment.name, schema: BookCommentSchema },
    ]),
  ],
  providers: [BookCommentsService, BookCommentsGateway],
})
export class BookCommentsModule {}
