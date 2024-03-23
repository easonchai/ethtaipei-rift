import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BridgeRequestModule } from './bridge-request/bridge-request.module';
import { FulfilmentRequestModule } from './fulfilment-request/fulfilment-request.module';
import { FulfilmentProofModule } from './fulfilment-proof/fulfilment-proof.module';
import { BullModule } from '@nestjs/bull';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { BridgeRequestProviderModule } from './bridge-request-provider/bridge-request-provider.module';
import { Web3Module } from './web3/web3.module';

@Module({
  imports: [
    PrismaModule,
    BridgeRequestModule,
    FulfilmentRequestModule,
    FulfilmentProofModule,
    EventEmitterModule.forRoot(),
    BullModule.forRoot({
      redis: {
        host: 'guardian-redis',
        port: 6379,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    BridgeRequestProviderModule,
    Web3Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
