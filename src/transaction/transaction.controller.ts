import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { BatchTransactionsDto } from './dtos/batch-transactions.dto';
import { TransactionService } from './providers/transaction.service';

@Controller('transactions')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  @Get('/:id')
  public async getTransactions(
    @Param('id', new DefaultValuePipe(null), ParseIntPipe) id: number,
  ) {
    return await this.transactionService.getTransactions(id);
  }
  @Post()
  public async processTransactions(
    @Body() batchTransactionsDto: BatchTransactionsDto,
  ) {
    return await this.transactionService.processBatchTransactions(
      batchTransactionsDto,
    );
  }
}
