import { BadRequestException, Injectable } from '@nestjs/common';
import { VerifyFulfilmentRequestDto } from './dto/requests/verify-fulfilment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { RateService } from 'src/rate/rate.service';
import { CreateFulfilmentRequestDto } from './dto/requests/create-fulfilment.dto';

@Injectable()
export class FulfilmentService {
  async create(cmd: CreateFulfilmentRequestDto) {
    return this.prismaService.fulfilment.create({
      data: {
        fulfilmentRequestId: cmd.fulfilmentRequestId,
        transactionHash: cmd.transactionHash,
        attestation: cmd.attestation,
        rateId: cmd.rateId,
      },
    });
  }

  async verifyFulfilmentRequest(cmd: VerifyFulfilmentRequestDto) {
    const request = await this.rateService.findOne({
      bridgeRequestId: cmd.bridgeRequestId,
    });

    if (!request) throw new BadRequestException('Bridge request not found');

    if (request.fulfilmentAmount !== cmd.agreedReceiveAmount)
      throw new BadRequestException('Agreed receive amount does not match');
  }

  findOne(cmd: { fulfilmentRequestId: string }) {
    return this.prismaService.fulfilment.findUnique({
      where: {
        fulfilmentRequestId: cmd.fulfilmentRequestId,
      },
    });
  }

  constructor(
    private readonly prismaService: PrismaService,
    private readonly rateService: RateService,
  ) {}
}
