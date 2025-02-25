import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BankModule } from './bank/bank.module';
import { PersonModule } from './person/person.module';
import { InitialDataSeeder } from './seeders/initial-data.seeder';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: [
    BankModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        autoLoadEntities: true,
        synchronize: true,
        port: +configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        host: configService.get('DB_HOST'),
        database: configService.get('DB_NAME'),
      }),
    }),
    TransactionModule,
    PersonModule,
  ],
  controllers: [AppController],
  providers: [InitialDataSeeder, AppService],
})
export class AppModule {}
