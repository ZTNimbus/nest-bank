import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from './person.entity';
import { PersonController } from './person.controller';
import { PersonService } from './providers/person.service';

@Module({
  exports: [TypeOrmModule], //For seeding on bootstrap
  imports: [TypeOrmModule.forFeature([Person])],
  controllers: [PersonController],
  providers: [PersonService],
})
export class PersonModule {}
