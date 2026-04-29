import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import Expo, { /* ExpoPushMessage, */ ExpoPushTicket } from 'expo-server-sdk';

@Injectable()
export class PushNotificationsService {
  private readonly expo = new Expo({
    accessToken: process.env.EXPO_ACCESS_TOKEN,
  });

  async sendNotification(toTokens: string[]) {
    const messages = toTokens.map((token) => {
      if (!Expo.isExpoPushToken(token)) {
        throw new BadRequestException(
          'There are strings thar are no expo tokens',
        );
      }
      return {
        to: token,
        sound: 'default',
        title: 'Notificación de Prueba',
        body: 'Esto fue enviado desde mi servidor de NestJS',
        data: { chatId: 'XYZ-123' },
      };
    });

    const chunks = this.expo.chunkPushNotifications(messages);
    const tickets: ExpoPushTicket[] = [];

    for (const chunk of chunks) {
      try {
        const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
        tickets.push(...ticketChunk);
      } catch (error) {
        console.error(error);
        throw new InternalServerErrorException(
          'Error sending push notifications chunks',
        );
      }
    }

    // const areExpoTokens = toTokens.every((token) =>
    //   Expo.isExpoPushToken(token),
    // );

    // if (!areExpoTokens) {
    //   throw new BadRequestException(
    //     'There are strings thar are no expo tokens',
    //   );
    // }

    // const messages: ExpoPushMessage[] = toTokens.map((token) => ({
    //   to: token,
    //   sound: 'default',
    //   title: 'Notifia¿cación de Prieba',
    //   body: 'Esto fue enciado desde mi servidor de NestJS',
    //   data: {
    //     chatId: 'XYZ-123',
    //   },
    // }));

    // const chunks = this.expo.chunkPushNotificationReceiptIds(messages);
    // const tickets: ExpoPushTicket[] = [];

    // for (const chunk of chunks) {
    //   try {
    //     const ticketChunk = await this.expo.sendPushNotificationsAsync(chunk);
    //     tickets.push(...ticketChunk);
    //   } catch (error) {
    //     console.error(error);
    //     throw new InternalServerErrorException(
    //       'Error sending push notifications chunks',
    //     );
    //   }
    // }

    return {
      done: true,
    };
  }
}
