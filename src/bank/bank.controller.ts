import { Controller, Get } from '@nestjs/common';
import { BankService } from './providers/bank.service';

@Controller('bank')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Get()
  public async getBank() {
    return this.bankService.getBank();
  }
}
