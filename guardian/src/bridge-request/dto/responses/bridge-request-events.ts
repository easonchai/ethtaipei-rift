export interface BridgeRequestEmitDto {
  id: string;
  sourceChain: string;
  destinationChain: string;
  sourceTokenAddress: string;
  destinationTokenAddress: string;
  sendAmount: string;
}
