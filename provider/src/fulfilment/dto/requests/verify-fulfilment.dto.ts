export class VerifyFulfilmentRequestDto {
  providerAddress: string;
  bridgeRequestId: string;
  fulfilmentRequestId: string;
  agreedReceiveAmount: string;
  signature: string;
}
