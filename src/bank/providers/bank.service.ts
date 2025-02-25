import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from '../bank.entity';
import { Repository } from 'typeorm';

@Injectable()
export class BankService {
  constructor(
    @InjectRepository(Bank) private readonly bankRepository: Repository<Bank>,
  ) {}

  public async getBank() {
    const banks = await this.bankRepository.find();

    if (!banks) throw new NotFoundException('No banks could be found.');

    return banks[0]; //Sending the first bank found for this simple application since we only have one bank in database. A more complex query would be required to find the exact bank requested, however it is not necessary here.
  }
}
