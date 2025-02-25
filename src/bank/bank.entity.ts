import Decimal from 'decimal.js';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Bank {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'decimal',
    precision: 10,
    scale: 2,
    default: 0.0,
  })
  balance: number;
  @Column({
    type: 'varchar',
    length: 100,
  })
  name: string;
}
