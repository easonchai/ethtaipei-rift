import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class FulfilmentRequestGateway {
  @SubscribeMessage('user_select_fulfilment_provider')
  listenToUserSelectingFulfilmentProvider(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { providerAddress: string },
  ) {
    this.clients.set(data.providerAddress, client);
  }

  emitFulfilmentRequest(data: {
    providerAddress: string;
    fulfilmentRequestId: string;
    agreedReceiveAmount: string;
    signature: string;
  }) {
    const client = this.clients.get(data.providerAddress);
    if (client) {
      client.emit('FULFILMENT_REQUEST', data);
    }
  }

  private clients = new Map<string, Socket>();
}
