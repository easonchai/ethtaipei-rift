import { Module } from '@nestjs/common';
import { FulfilmentService } from './fulfilment.service';
import { FulfilmentController } from './fulfilment.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { RateModule } from 'src/rate/rate.module';

@Module({
  imports: [PrismaModule, RateModule],
  controllers: [FulfilmentController],
  providers: [FulfilmentService],
  exports: [FulfilmentService],
})
export class FulfilmentModule {}
