import { Injectable } from '@nestjs/common';
import { CreateFulfilmentRequestDto } from './dto/requests/create-fulfilment-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { FulfilmentRequestGateway } from './fulfilment-request.gateway';

@Injectable()
export class FulfilmentRequestService {
  async createFulfilmentRequest(dto: CreateFulfilmentRequestDto) {
    const request = await this.prismaService.fulfilmentRequest.create({
      data: {
        bridgeRequest: {
          connect: {
            id: dto.bridgeRequestId,
          },
        },
        providerAddress: dto.providerAddress,
        agreedReceiveAmount: dto.agreedReceiveAmount,
        signature: dto.signature,
      },
    });

    if (request) {
      this.fulfilmentRequestGateway.emitFulfilmentRequest({
        fulfilmentRequestId: request.id,
        providerAddress: request.providerAddress,
        agreedReceiveAmount: request.agreedReceiveAmount,
        signature: request.signature,
      });
    }
  }

  findOne(cmd: { id: string }) {
    return this.prismaService.fulfilmentRequest.findUnique({
      where: {
        bridgeRequestId: cmd.id,
      },
    });
  }

  constructor(
    private readonly prismaService: PrismaService,
    private readonly fulfilmentRequestGateway: FulfilmentRequestGateway,
  ) {}
}
