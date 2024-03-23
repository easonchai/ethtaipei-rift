import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateFulfilmentProofDto {
  @ApiProperty({
    description: 'The transaction hash',
    type: String,
  })
  @IsString()
  transactionHash: string;

  @ApiProperty({
    description: 'Request ID',
    type: String,
  })
  @IsString()
  fulfilmentRequestId: string;

  @ApiProperty({
    description: 'The attestation of the fulfilment proof',
    type: String,
  })
  @IsString()
  attestation: string;

  constructor(partial: Partial<CreateFulfilmentProofDto>) {
    Object.assign(this, partial);
  }
}
