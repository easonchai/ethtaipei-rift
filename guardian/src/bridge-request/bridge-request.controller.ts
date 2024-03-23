import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { BridgeRequestService } from './bridge-request.service';
import { CreateBridgeRequestDto } from './dto/requests/create-bridge-request.dto';

@Controller('bridge-request')
export class BridgeRequestController {
  constructor(private readonly bridgeRequestService: BridgeRequestService) {}

  @Post()
  createBridgeRequest(@Body() createBridgeRequestDto: CreateBridgeRequestDto) {
    return this.bridgeRequestService.createBridgeRequest(
      createBridgeRequestDto,
    );
  }

  @Get()
  findAll() {
    return this.bridgeRequestService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bridgeRequestService.findOne({
      id,
    });
  }
}
