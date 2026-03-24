import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { NegotiationsService } from '../modules/negotiations/negotiations.service';
import { MessagesService } from '../modules/messages/messages.service';
import { JwtPayload } from '../common/types/jwt-payload.type';

interface SocketData {
  user: JwtPayload | null;
}

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server!: Server;

  constructor(
    private readonly jwtService: JwtService,
    private readonly negotiationsService: NegotiationsService,
    private readonly messagesService: MessagesService,
  ) {}

  async handleConnection(socket: Socket) {
    try {
      const token = socket.handshake.auth?.token as string;
      if (!token) {
        socket.disconnect();
        return;
      }

      const payload = this.jwtService.verify<JwtPayload>(token, {
        secret: process.env.JWT_ACCESS_SECRET,
      });

      (socket.data as SocketData).user = payload;
      await socket.join(`user:${payload.sub}`);
    } catch {
      socket.disconnect();
    }
  }

  handleDisconnect(socket: Socket) {
    // cleanup — socket rooms are automatically cleared
    (socket.data as SocketData).user = null;
  }

  @SubscribeMessage('chat:join_session')
  async handleJoinSession(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { sessionId: string },
  ) {
    try {
      const user = (socket.data as SocketData).user;
      if (!user) return;

      await this.negotiationsService.verifyParticipant(
        data.sessionId,
        user.sub,
      );
      await socket.join(`session:${data.sessionId}`);

      socket.emit('chat:session_joined', { sessionId: data.sessionId });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      socket.emit('chat:error', { message });
    }
  }

  @SubscribeMessage('chat:send_message')
  async handleSendMessage(
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    data: {
      sessionId: string;
      type: string;
      text?: string;
      voiceNoteUrl?: string;
      voiceNoteDurationSecs?: number;
      imageUrl?: string;
    },
  ) {
    try {
      const user = (socket.data as SocketData).user;
      if (!user) return;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const { message, session } = await this.messagesService.create(
        data.sessionId,
        user.sub,
        user.role,
        {
          sessionId: data.sessionId,
          type: data.type as never,
          text: data.text,
          voiceNoteUrl: data.voiceNoteUrl,
          voiceNoteDurationSecs: data.voiceNoteDurationSecs,
          imageUrl: data.imageUrl,
        },
      );

      // Broadcast message to everyone in the session room
      this.server.to(`session:${data.sessionId}`).emit('chat:message', message);

      // Notify the other participant's personal room so their inbox refreshes
      const otherUserId =
        user.sub === session.buyerId ? session.farmerId : session.buyerId;
      this.server
        .to(`user:${otherUserId}`)
        .emit('chat:inbox_update', { sessionId: data.sessionId, message });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      socket.emit('chat:error', { message });
    }
  }

  @SubscribeMessage('chat:mark_read')
  async handleMarkRead(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { sessionId: string },
  ) {
    try {
      const user = (socket.data as SocketData).user;
      if (!user) return;

      await this.messagesService.markRead(data.sessionId, user.sub, user.role);

      socket.emit('chat:message_read', { sessionId: data.sessionId });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      socket.emit('chat:error', { message });
    }
  }

  @SubscribeMessage('chat:typing')
  handleTyping(
    @ConnectedSocket() socket: Socket,
    @MessageBody() data: { sessionId: string; isTyping: boolean },
  ) {
    const user = (socket.data as SocketData).user;
    if (!user) return;

    socket.to(`session:${data.sessionId}`).emit('user:typing', {
      userId: user.sub,
      sessionId: data.sessionId,
      isTyping: data.isTyping,
    });
  }

  emitToUser(userId: string, event: string, data: unknown) {
    this.server.to(`user:${userId}`).emit(event, data);
  }

  emitToSession(sessionId: string, event: string, data: unknown) {
    this.server.to(`session:${sessionId}`).emit(event, data);
  }
}
