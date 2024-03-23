import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNumber, IsString } from 'class-validator';

export class GiveBestPriceRequestDto {
  @ApiProperty({
    description: "Provider's address",
    type: String,
  })
  @IsEthereumAddress()
  providerAddress: string;

  @ApiProperty({
    description: 'Bridge request ID',
    type: String,
  })
  @IsString()
  bridgeRequestId: string;

  @ApiProperty({
    description: 'Amount to give',
    type: String,
  })
  @IsString()
  fulfilmentAmount: string;

  @ApiProperty({
    description:
      'How long in seconds the provider will take to fulfil the request',
    type: Number,
  })
  @IsNumber()
  sla: number;
}
