import { PartialType } from '@nestjs/swagger';
import { CreateFulfilmentRequestDto } from './requests/create-fulfilment-request.dto';

export class UpdateFulfilmentRequestDto extends PartialType(
  CreateFulfilmentRequestDto,
) {}
