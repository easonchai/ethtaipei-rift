import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FulfilmentProofService } from './fulfilment-proof.service';
import { CreateFulfilmentProofDto } from './dto/requests/create-fulfilment-proof.dto';

@Controller('fulfilment-proof')
export class FulfilmentProofController {
  constructor(
    private readonly fulfilmentProofService: FulfilmentProofService,
  ) {}

  @Post()
  create(@Body() createFulfilmentProofDto: CreateFulfilmentProofDto) {
    return this.fulfilmentProofService.create(createFulfilmentProofDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.fulfilmentProofService.findOne({
      id,
    });
  }
}
