import { Injectable } from '@nestjs/common';
import { GiveBestPriceRequestDto } from './dto/requests/give-best-price-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BridgeRequestProviderService {
  async giveBestPrice(cmd: GiveBestPriceRequestDto) {
    return await this.prismaService.bridgeRequestProvider.create({
      data: {
        providerAddress: cmd.providerAddress,
        bridgeRequest: {
          connect: {
            id: cmd.bridgeRequestId,
          },
        },
        fulfilmentAmount: cmd.fulfilmentAmount,
        sla: cmd.sla,
      },
    });
  }

  findPricesByRequestId(cmd: { id: string }) {
    return this.prismaService.bridgeRequestProvider.findMany({
      where: { bridgeRequestId: cmd.id },
    });
  }

  constructor(private readonly prismaService: PrismaService) {}
}
