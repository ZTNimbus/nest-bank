import { Controller, Get } from '@nestjs/common';

@Controller('bank')
export class BankController {
  @Get()
  public getBank() {
    return 'Hi from bank';
  }
}
