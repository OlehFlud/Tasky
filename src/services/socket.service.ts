import { Server, Socket } from 'socket.io';

export class SocketService {
  private io: Server;

  constructor(server: any) {
    try {
      this.io = new Server(server, {
        cors: {
          origin: '*', // You can configure this based on your needs
          methods: ['GET', 'POST'],
        },
      });
      this.registerEventHandlers();
      console.log('Socket.IO initialized successfully');
    } catch (error) {
      console.error('Error initializing Socket.IO:', error);
      throw new Error('Socket.IO initialization failed');
    }
  }
  // Emit a custom event from outside the class
  public emitEvent(event: string, data: any): void {
    this.io.emit(event, data);
  }

  // Method to register all socket events
  private registerEventHandlers(): void {
    this.io.on('connection', (socket: Socket) => {
      console.log('A user connected:', socket.id);

      // Handle disconnection
      socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
      });
    });
  }
}
export const socketService = SocketService;
