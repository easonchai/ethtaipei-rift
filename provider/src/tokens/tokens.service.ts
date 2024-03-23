import { Injectable } from '@nestjs/common';
import { AddTokenDto } from './dto/requests/add-token.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TokensService {
  addToken(dto: AddTokenDto) {
    return this.prismaService.acceptedTokens.create({
      data: {
        tokenAddress: dto.tokenAddress,
        chainId: dto.chainId,
      },
    });
  }

  findAll() {
    return this.prismaService.acceptedTokens.findMany();
  }

  findOne(cmd: { tokenAddress: string; chainId: string }) {
    return this.prismaService.acceptedTokens.findUnique({
      where: {
        tokenAddress_chainId: {
          tokenAddress: cmd.tokenAddress,
          chainId: cmd.chainId,
        },
      },
    });
  }

  constructor(private readonly prismaService: PrismaService) {}
}
