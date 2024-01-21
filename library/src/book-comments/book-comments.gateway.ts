import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { UseFilters } from '@nestjs/common';

import { BookCommentsService } from './book-comments.service';
import { BookCommentDocument } from './schemas/book-comment.schema';
import { CreateBookCommentDto } from './validation/dto/create-book-comment.dto';
import { ValidationWebsocketPipe } from '../pipes/validation.websocket.pipe';
import { WebsocketExceptionFilter } from '../exception-filters/websocket.exception.filter';

@UseFilters(WebsocketExceptionFilter)
@WebSocketGateway({ cors: true })
export class BookCommentsGateway {
  constructor(private bookCommentsService: BookCommentsService) {}

  @SubscribeMessage('getComments')
  getAllComments(
    @MessageBody() bookId: string,
  ): Promise<BookCommentDocument[]> {
    return this.bookCommentsService.findAllBookComments(bookId);
  }

  @SubscribeMessage('addComment')
  addComment(
    @MessageBody(ValidationWebsocketPipe) comment: CreateBookCommentDto,
  ): Promise<BookCommentDocument> {
    return this.bookCommentsService.create(comment);
  }
}
