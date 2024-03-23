import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { TokensService } from './tokens.service';
import { AddTokenDto } from './dto/requests/add-token.dto';

@Controller('tokens')
export class TokensController {
  constructor(private readonly tokensService: TokensService) {}

  @Post()
  create(@Body() dto: AddTokenDto) {
    return this.tokensService.addToken(dto);
  }

  @Get()
  findAll() {
    return this.tokensService.findAll();
  }

  @Get(':tokenAddress/:chainId')
  findOne(
    @Param('tokenAddress') tokenAddress: string,
    @Param('chainId') chainId: string,
  ) {
    return this.tokensService.findOne({
      tokenAddress,
      chainId,
    });
  }
}
