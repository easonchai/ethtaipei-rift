import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class Web3Service {
  constructor(private readonly prismaService: PrismaService) {}
}
