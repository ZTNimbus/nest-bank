import { CreateTransactionDto } from './create-transaction.dto';

export class BatchTransactionsDto {
  transactions: CreateTransactionDto[];
}
