import { Module } from '@nestjs/common';
import { BridgeRequestProviderService } from './bridge-request-provider.service';
import { BridgeRequestProviderController } from './bridge-request-provider.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { BridgeRequestModule } from 'src/bridge-request/bridge-request.module';

@Module({
  imports: [PrismaModule, BridgeRequestModule],
  controllers: [BridgeRequestProviderController],
  providers: [BridgeRequestProviderService],
})
export class BridgeRequestProviderModule {}
