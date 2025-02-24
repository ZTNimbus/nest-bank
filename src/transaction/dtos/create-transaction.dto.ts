import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateTransactionDto {
  @IsNotEmpty()
  @IsNumber()
  personId: number;

  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
