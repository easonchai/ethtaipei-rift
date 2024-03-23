import { Module } from '@nestjs/common';
import { FulfilmentRequestService } from './fulfilment-request.service';
import { FulfilmentRequestController } from './fulfilment-request.controller';
import { FulfilmentRequestGateway } from './fulfilment-request.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [FulfilmentRequestController],
  providers: [FulfilmentRequestService, FulfilmentRequestGateway],
  exports: [FulfilmentRequestService, FulfilmentRequestGateway],
})
export class FulfilmentRequestModule {}
