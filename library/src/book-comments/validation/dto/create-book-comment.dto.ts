import { IsDefined, IsMongoId, IsString } from 'class-validator';

export class CreateBookCommentDto {
  @IsMongoId()
  @IsDefined()
  public bookId: string;

  @IsString()
  @IsDefined()
  public comment: string;
}
