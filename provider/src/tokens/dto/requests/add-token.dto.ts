import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AddTokenDto {
  @ApiProperty({
    description: 'Token Address',
    type: String,
  })
  tokenAddress: string;

  @ApiProperty({
    description: 'Chain ID',
    type: String,
  })
  @IsString()
  chainId: string;

  constructor(partial: Partial<AddTokenDto>) {
    Object.assign(this, partial);
  }
}
