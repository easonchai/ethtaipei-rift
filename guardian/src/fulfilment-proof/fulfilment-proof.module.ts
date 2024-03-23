import { Module } from '@nestjs/common';
import { FulfilmentProofService } from './fulfilment-proof.service';
import { FulfilmentProofController } from './fulfilment-proof.controller';
import { FulfilmentProofGateway } from './fulfilment-proof.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FulfilmentProofController],
  providers: [FulfilmentProofService, FulfilmentProofGateway],
  exports: [FulfilmentProofService, FulfilmentProofGateway],
})
export class FulfilmentProofModule {}
