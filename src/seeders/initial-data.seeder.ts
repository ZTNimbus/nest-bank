import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bank } from 'src/bank/bank.entity';
import { Person } from 'src/person/person.entity';
import { Repository } from 'typeorm';

//Create a mock Bank and 3 users on bootstrap if no such entities are present in the database.

@Injectable()
export class InitialDataSeeder implements OnApplicationBootstrap {
  constructor(
    @InjectRepository(Person)
    private personRepository: Repository<Person>,
    @InjectRepository(Bank)
    private bankRepository: Repository<Bank>,
  ) {}

  async onApplicationBootstrap() {
    await this.seedBank();
    await this.seedPersons();
  }

  private async seedBank() {
    const existingBank = await this.bankRepository.find();

    if (existingBank.length) return;
    await this.bankRepository.save({
      name: 'Nest Bank',
      balance: 100, // Initial balance $100
    });
    console.log('Bank seeded successfully');
  }

  private async seedPersons() {
    const existingPersons = await this.personRepository.find();

    if (existingPersons.length > 0) return;

    const persons = [
      { name: 'John Doe' },
      { name: 'Jane Smith' },
      { name: 'Bob Johnson' },
    ]; //Just names are enough for a simple application like this. On a more complex application, unique email adresses would be required for sign up/sign in etc.

    await this.personRepository.save(persons);
    console.log('Persons seeded successfully');
  }
}
