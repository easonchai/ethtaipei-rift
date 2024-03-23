import { LoggerService, Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { BridgeRequestEmitDto } from './dto/responses/bridge-request-events';

@WebSocketGateway()
export class BridgeRequestGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  emitBridgeRequest(cmd: BridgeRequestEmitDto) {
    this.server.emit('BRIDGE_REQUEST', cmd);
  }

  /**
   * To add client to the map when connected
   * @param client
   */
  handleConnection(@ConnectedSocket() client: Socket) {
    this.clients.set(client.id, client);
    this.logger.log(`Client connected with ID: ${client.id}`);
  }

  /**
   * To clear client from the map when disconnected
   * @param client
   */
  handleDisconnect(@ConnectedSocket() client: Socket) {
    this.clients.forEach((value, key) => {
      if (value.id === client.id) {
        this.clients.delete(key);
      }
    });
  }

  private clients = new Map<string, Socket>();
  private readonly logger: LoggerService = new Logger(
    BridgeRequestGateway.name,
  );
}
