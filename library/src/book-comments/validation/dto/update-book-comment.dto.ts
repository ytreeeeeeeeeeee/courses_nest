import { IsOptional, IsString } from 'class-validator';

export class UpdateBookCommentDto {
  @IsString()
  @IsOptional()
  public comment: string;
}
