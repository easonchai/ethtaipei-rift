import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsString } from 'class-validator';

export class CreateBridgeRequestDto {
  @ApiProperty({
    description: 'The address of the sender of the bridge request',
    type: String,
  })
  @IsEthereumAddress()
  sender: string;

  @ApiProperty({
    description: 'The address of the receiver of the bridge request',
    type: String,
  })
  @IsEthereumAddress()
  receiver: string;

  @ApiProperty({
    description: 'Source chain ID',
    type: String,
  })
  @IsString()
  sourceChain: string;

  @ApiProperty({
    description: 'Destination chain ID',
    type: String,
  })
  @IsString()
  destinationChain: string;

  @ApiProperty({
    description: 'Source chain token address',
    type: String,
  })
  @IsEthereumAddress()
  sourceTokenAddress: string;

  @ApiProperty({
    description: 'Destination chain token address',
    type: String,
  })
  @IsEthereumAddress()
  destinationTokenAddress: string;

  @ApiProperty({
    description: 'Amount to bridge',
    type: String,
  })
  @IsString()
  sendAmount: string;

  constructor(partial: Partial<CreateBridgeRequestDto>) {
    Object.assign(this, partial);
  }
}
