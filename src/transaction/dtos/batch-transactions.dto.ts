import { IsArray, ValidateNested } from 'class-validator';
import { CreateTransactionDto } from './create-transaction.dto';
import { Type } from 'class-transformer';

export class BatchTransactionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateTransactionDto)
  transactions: CreateTransactionDto[];
}
