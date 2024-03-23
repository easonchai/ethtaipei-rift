import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { TokensModule } from './tokens/tokens.module';
import { RateModule } from './rate/rate.module';
import { FulfilmentModule } from './fulfilment/fulfilment.module';
import { Web3Module } from './web3/web3.module';

@Module({
  imports: [
    PrismaModule,
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'provider-redis',
        port: 6379,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    TokensModule,
    RateModule,
    FulfilmentModule,
    Web3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
