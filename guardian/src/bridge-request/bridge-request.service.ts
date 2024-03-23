import {
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateBridgeRequestDto } from './dto/requests/create-bridge-request.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { BridgeRequestGateway } from './bridge-request.gateway';

@Injectable()
export class BridgeRequestService {
  async createBridgeRequest(cmd: CreateBridgeRequestDto) {
    try {
      const request = await this.prismaService.bridgeRequest.create({
        data: {
          sender: cmd.sender,
          receiver: cmd.receiver,
          sourceChain: cmd.sourceChain,
          destinationChain: cmd.destinationChain,
          sourceTokenAddress: cmd.sourceTokenAddress,
          destinationTokenAddress: cmd.destinationTokenAddress,
          sendAmount: cmd.sendAmount,
        },
      });

      if (!request) {
        throw new InternalServerErrorException(
          'Failed to create bridge request',
        );
      }
      this.bridgeRequestGateway.emitBridgeRequest({
        id: request.id,
        sourceChain: cmd.sourceChain,
        destinationChain: cmd.destinationChain,
        sourceTokenAddress: cmd.sourceTokenAddress,
        destinationTokenAddress: cmd.destinationTokenAddress,
        sendAmount: cmd.sendAmount,
      });

      return request;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  findAll() {
    try {
      return this.prismaService.bridgeRequest.findMany();
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  async findOne(cmd: { id: string }) {
    try {
      const request = await this.prismaService.bridgeRequest.findUnique({
        where: { id: cmd.id },
      });

      if (!request)
        throw new NotFoundException(
          `Bridge request with ID ${cmd.id} not found`,
        );

      return request;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException('Something went wrong');
    }
  }

  private readonly logger = new Logger(BridgeRequestService.name);
  constructor(
    private readonly prismaService: PrismaService,
    private readonly bridgeRequestGateway: BridgeRequestGateway,
  ) {}
}
