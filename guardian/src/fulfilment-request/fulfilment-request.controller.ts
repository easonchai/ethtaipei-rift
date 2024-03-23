import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FulfilmentRequestService } from './fulfilment-request.service';
import { CreateFulfilmentRequestDto } from './dto/requests/create-fulfilment-request.dto';

@Controller('fulfilment-request')
export class FulfilmentRequestController {
  constructor(
    private readonly fulfilmentRequestService: FulfilmentRequestService,
  ) {}

  @Post()
  createFulfilmentRequest(
    @Body() createFulfilmentRequestDto: CreateFulfilmentRequestDto,
  ) {
    return this.fulfilmentRequestService.createFulfilmentRequest(
      createFulfilmentRequestDto,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fulfilmentRequestService.findOne({
      id,
    });
  }
}
