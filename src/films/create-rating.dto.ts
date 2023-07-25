import { IsNotEmpty } from 'class-validator';
export class CreateRatingDto {

  @IsNotEmpty()
  readonly rating: Number;
}
