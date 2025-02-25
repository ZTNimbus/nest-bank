import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @IsNotEmpty()
  @IsNumber()
  @Transform(({ value }) => parseFloat(parseFloat(value).toFixed(2)))
  amount: number;
}
