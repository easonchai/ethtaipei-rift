import { Module } from '@nestjs/common';
import { BridgeRequestService } from './bridge-request.service';
import { BridgeRequestController } from './bridge-request.controller';
import { BridgeRequestGateway } from './bridge-request.gateway';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BridgeRequestController],
  providers: [BridgeRequestService, BridgeRequestGateway],
  exports: [BridgeRequestService, BridgeRequestGateway],
})
export class BridgeRequestModule {}
