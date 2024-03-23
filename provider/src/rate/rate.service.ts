import { Injectable } from '@nestjs/common';
import { CreateRateDto } from './dto/requests/create-rate.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ethers } from 'ethers';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class RateService {
  private fees = {
    ETH: {
      min: 0.001,
      max: 0.005,
    },
    USDT: {
      min: 10,
      max: 40,
    },
    USDC: {
      min: 10,
      max: 40,
    },
    BTC: {
      min: 0.000078,
      max: 0.00047,
    },
  };

  private randomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  async create(dto: CreateRateDto) {
    const sla = this.randomNumber(1, 300);
    const rate = this.generateBestPrice({
      amount: dto.amount,
      symbol: dto.tokenSymbol,
    });
    const data = await this.prismaService.rate.create({
      data: {
        bridgeRequestId: dto.bridgeRequestId,
        fulfilmentAmount: rate,
        sla,
      },
    });

    if (data) {
      await this.httpService.post(
        'http://localhost:3001/bridge-request-provider',
        {
          providerAddress: '0x',
          bridgeRequestId: dto.bridgeRequestId,
          fulfilmentAmount: rate,
          sla,
        },
      );
    }
  }

  findAll() {
    return this.prismaService.rate.findMany();
  }

  findOne(cmd: { bridgeRequestId: string }) {
    return this.prismaService.rate.findUnique({
      where: {
        bridgeRequestId: cmd.bridgeRequestId,
      },
    });
  }

  generateBestPrice(cmd: { amount: string; symbol: string }) {
    // Assume that there is a fixed fee since I cant brain an oracle in 24 hours
    const feeData = this.fees[cmd.symbol];
    const fee = this.randomNumber(feeData.min, feeData.max);

    const quote = ethers.parseEther(cmd.amount) - ethers.parseEther(fee);
    return ethers.formatEther(quote);
  }

  constructor(
    private readonly prismaService: PrismaService,
    private readonly httpService: HttpService,
  ) {}
}
