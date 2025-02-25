import { Controller, Get } from '@nestjs/common';
import { PersonService } from './providers/person.service';

@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}
  @Get()
  public async getPersons() {
    return await this.personService.getPersons();
  }
}
