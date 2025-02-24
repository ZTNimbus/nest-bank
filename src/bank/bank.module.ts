import { Module } from '@nestjs/common';
import { BankController } from './bank.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Bank } from './bank.entity';

@Module({
  controllers: [BankController],
  exports: [TypeOrmModule], //For seeding on bootstrap
  imports: [TypeOrmModule.forFeature([Bank])],
})
export class BankModule {}
