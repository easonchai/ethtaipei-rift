import { Injectable } from '@nestjs/common';
import { CreateFulfilmentProofDto } from './dto/requests/create-fulfilment-proof.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { AlchemyProvider, ethers, JsonRpcProvider, Provider } from 'ethers';

enum ChainIds {
  Ethereum = '11155111',
  Base = '84532',
  Linea = '59140',
  Optimism = '11155420',
  Polygon = '2442',
  Scroll = '534351',
  TenProtocol = '443',
  Thundercore = '18',
  Zircuit = '48899',
}

@Injectable()
export class FulfilmentProofService {
  create(cmd: CreateFulfilmentProofDto) {
    return this.prismaService.fulfilmentProof.create({
      data: {
        request: {
          connect: {
            id: cmd.fulfilmentRequestId,
          },
        },
        transactionHash: cmd.transactionHash,
        attestation: cmd.attestation,
      },
    });
  }

  generateSignature(cmd: {
    chainId: string;
    transactionHash: string;
    providerAddress: string;
    requestId: string;
  }) {
    const wallet = new ethers.Wallet(
      process.env.PRIVATE_KEY,
      this.providers.get(cmd.chainId),
    );

    if (wallet) {
      return wallet.signMessage(
        JSON.stringify({
          transactionHash: cmd.transactionHash,
          providerAddres: cmd.providerAddress,
          requestId: cmd.requestId,
        }),
      );
    }
  }

  findOne(cmd: { id: string }) {
    return this.prismaService.fulfilmentProof.findUnique({
      where: {
        id: cmd.id,
      },
    });
  }

  private providers: Map<string, Provider>;
  constructor(private readonly prismaService: PrismaService) {
    this.providers = new Map<string, Provider>();
    this.providers.set(
      ChainIds.Ethereum,
      new AlchemyProvider(ChainIds.Ethereum, process.env.ALCHEMY_KEY),
    );
    this.providers.set(
      ChainIds.Base,
      new AlchemyProvider(ChainIds.Base, process.env.ALCHEMY_KEY),
    );
    this.providers.set(
      ChainIds.Polygon,
      new AlchemyProvider(ChainIds.Polygon, process.env.ALCHEMY_KEY),
    );
    this.providers.set(
      ChainIds.Optimism,
      new AlchemyProvider(ChainIds.Optimism, process.env.ALCHEMY_KEY),
    );
    this.providers.set(
      ChainIds.Linea,
      new JsonRpcProvider(`https://linea-goerli.blockpi.network/v1/rpc/public`),
    );
    this.providers.set(
      ChainIds.Scroll,
      new JsonRpcProvider(
        `https://scroll-sepolia.core.chainstack.com/${process.env.CHAINSTACK_KEY}`,
      ),
    );
    this.providers.set(
      ChainIds.TenProtocol,
      new JsonRpcProvider(
        `https://testnet.ten.xyz/v1/?token=7f1fd2d40fbe7d25e96b5d69429569291572232c`,
      ),
    );
    this.providers.set(
      ChainIds.Thundercore,
      new JsonRpcProvider(`https://testnet-rpc.thundercore.com`),
    );
    this.providers.set(
      ChainIds.Zircuit,
      new JsonRpcProvider(`https://zircuit1.p2pify.com/`),
    );
  }
}
