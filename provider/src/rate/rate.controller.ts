import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { RateService } from './rate.service';
import { CreateRateDto } from './dto/requests/create-rate.dto';

@Controller('rate')
export class RateController {
  constructor(private readonly rateService: RateService) {}

  @Post()
  create(@Body() createRateDto: CreateRateDto) {
    return this.rateService.create(createRateDto);
  }

  @Get()
  findAll() {
    return this.rateService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rateService.findOne({
      bridgeRequestId: id,
    });
  }
}
