import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/bank/bank.entity';
import { Person } from 'src/person/person.entity';
import { DataSource, Repository } from 'typeorm';
import { BatchTransactionsDto } from '../dtos/batch-transactions.dto';
import { CreateTransactionDto } from '../dtos/create-transaction.dto';
import { Transaction } from '../transaction.entity';
import Decimal from 'decimal.js';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
    private readonly dataSource: DataSource,
  ) {}

  public async getTransactions(id: number) {
    if (id < 1) return { message: 'Invalid ID.' };

    const person = await this.personRepository.find({ where: { id } });

    return await this.transactionRepository.find({
      where: { person },
      order: { timestamp: 'DESC' },
    });
  }

  public async processTransaction(createTransactionDto: CreateTransactionDto) {
    const queryRunner = this.dataSource.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();

    try {
      const banks = await queryRunner.manager.find(Bank);

      const bank = banks[0];

      const person = await queryRunner.manager.findOne(Person, {
        where: { id: createTransactionDto.personId },
      });

      if (!bank || !person)
        throw new NotFoundException(
          'Either the bank or the person is missing.',
        );

      const transaction = queryRunner.manager.create(Transaction, {
        person,
        bank,
        amount: createTransactionDto.amount,
        status: 'pending',
      });

      bank.balance = new Decimal(bank.balance)
        .plus(createTransactionDto.amount)
        .toNumber();

      await queryRunner.manager.save(bank);

      transaction.status = 'completed';

      await queryRunner.manager.save(transaction);

      await queryRunner.commitTransaction();

      return transaction;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  public async processBatchTransactions(
    batchTransactionsDto: BatchTransactionsDto,
  ) {
    const batchedTransactions = batchTransactionsDto.transactions.map((t) => {
      return this.processTransaction(t);
    });

    return Promise.all(batchedTransactions);
  }
}
