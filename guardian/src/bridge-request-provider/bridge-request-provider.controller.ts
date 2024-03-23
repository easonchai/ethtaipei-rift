import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BridgeRequestProviderService } from './bridge-request-provider.service';
import { GiveBestPriceRequestDto } from './dto/requests/give-best-price-request.dto';

@Controller('bridge-request-provider')
export class BridgeRequestProviderController {
  constructor(
    private readonly bridgeRequestProviderService: BridgeRequestProviderService,
  ) {}

  @Post()
  giveBestPrice(@Body() dto: GiveBestPriceRequestDto) {
    return this.bridgeRequestProviderService.giveBestPrice({
      bridgeRequestId: dto.bridgeRequestId,
      fulfilmentAmount: dto.fulfilmentAmount,
      providerAddress: dto.providerAddress,
      sla: dto.sla,
    });
  }

  @Get(':id')
  findPricesByRequestId(@Param('id') id: string) {
    return this.bridgeRequestProviderService.findPricesByRequestId({
      id,
    });
  }
}
