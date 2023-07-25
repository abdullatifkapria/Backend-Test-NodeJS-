import { IsNotEmpty } from 'class-validator';
export class CreateFilmDto {

  @IsNotEmpty()
  readonly name: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly releaseDate: Date;

  @IsNotEmpty()
  readonly ticketPrice: Number;


 @IsNotEmpty()
  readonly country: string;

  @IsNotEmpty()
  readonly genre: string;

  @IsNotEmpty()
  readonly photo: string;






}
