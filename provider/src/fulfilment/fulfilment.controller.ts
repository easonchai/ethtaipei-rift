import { Controller, Get, Param } from '@nestjs/common';
import { FulfilmentService } from './fulfilment.service';

@Controller('fulfilment')
export class FulfilmentController {
  constructor(private readonly fulfilmentService: FulfilmentService) {}
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fulfilmentService.findOne({
      fulfilmentRequestId: id,
    });
  }
}
