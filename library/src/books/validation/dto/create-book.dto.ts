import {
  ArrayMinSize,
  IsArray,
  IsDefined,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsDefined()
  public title: string;

  @IsString()
  @IsOptional()
  public description: string;

  @IsArray()
  @IsDefined()
  @ArrayMinSize(1, {
    message: 'Number of authors should be more than 0',
  })
  public authors: string[];
}
