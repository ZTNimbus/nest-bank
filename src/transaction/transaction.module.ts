import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TransactionService } from './providers/transaction.service';
import { TransactionController } from './transaction.controller';
import { Transaction } from './transaction.entity';
import { Person } from 'src/person/person.entity';
import { Bank } from 'src/bank/bank.entity';

@Module({
  providers: [TransactionService],
  controllers: [TransactionController],
  imports: [TypeOrmModule.forFeature([Transaction, Bank, Person])],
})
export class TransactionModule {}
