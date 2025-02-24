import { Bank } from 'src/bank/bank.entity';
import { Person } from 'src/person/person.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Person, (person) => person.transactions)
  person: Person;

  @ManyToOne(() => Bank)
  bank: Bank;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    nullable: false,
  })
  amount: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  status: 'pending' | 'completed' | 'failed';
}
