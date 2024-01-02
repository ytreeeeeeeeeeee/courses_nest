import { ArrayMinSize, IsArray, IsOptional, IsString } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  public title: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsArray()
  @IsOptional()
  @ArrayMinSize(1, {
    message: 'Number of authors should be more than 0',
  })
  public authors: string[];
}
