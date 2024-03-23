import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsString } from 'class-validator';

export class CreateFulfilmentRequestDto {
  @ApiProperty({
    description: 'Bridge request ID',
    type: String,
  })
  @IsString()
  bridgeRequestId: string;

  @ApiProperty({
    description: 'Provider address',
    type: String,
  })
  @IsEthereumAddress()
  providerAddress: string;

  @ApiProperty({
    description: 'Agreed receive amount',
    type: String,
  })
  @IsString()
  agreedReceiveAmount: string;

  @ApiProperty({
    description: 'Signature proof to allow transaction',
    type: String,
  })
  @IsString()
  signature: string;

  constructor(partial: Partial<CreateFulfilmentRequestDto>) {
    Object.assign(this, partial);
  }
}
