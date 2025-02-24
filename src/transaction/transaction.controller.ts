import { Body, Controller, Get, Post } from '@nestjs/common';
import { BatchTransactionsDto } from './dtos/batch-transactions.dto';
import { TransactionService } from './providers/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get()
  public async getTransactions() {
    return await this.transactionService.getTransactions();
  }
  //TODO TEST WITH POSTMAN
  @Post('batch')
  public async processTransactions(
    @Body() batchTransactionsDto: BatchTransactionsDto,
  ) {
    return await this.transactionService.processBatchTransactions(
      batchTransactionsDto,
    );
  }
}
