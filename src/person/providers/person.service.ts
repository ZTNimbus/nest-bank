import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from '../person.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ) {}

  public async getPersons() {
    return await this.personRepository.find();
  }
}
