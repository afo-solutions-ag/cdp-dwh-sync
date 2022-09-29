import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SQSConfig } from './sqs.config';

type CreateMessage<T = object> = { new: T };
type UpdateMessage<T = object> = { old: T; new: T };
type DeleteMessage<T = object> = { old: T };

@Injectable()
export class SQSService {
  client: SQSClient;
  queueUrl: string;

  constructor(configService: ConfigService<SQSConfig>) {
    const region = configService.getOrThrow<string>('REGION');
    const accessKeyId = configService.getOrThrow<string>('ACCESS_KEY_ID');
    const secretAccessKey =
      configService.getOrThrow<string>('SECRET_ACCESS_KEY');

    this.client = new SQSClient({
      region,
      credentials: { accessKeyId, secretAccessKey },
    });
    this.queueUrl = configService.getOrThrow<string>('QUEUE_URL');
  }

  private async sendMessage(
    message: object,
    entity: string,
    eventType: 'CREATE' | 'UPDATE' | 'DELETE',
  ) {
    const messageJson = JSON.stringify(message);

    return await this.client.send(
      new SendMessageCommand({
        QueueUrl: this.queueUrl,
        MessageBody: messageJson,
        MessageAttributes: {
          Entity: { DataType: 'String', StringValue: entity },
          EventType: { DataType: 'String', StringValue: eventType },
        },
      }),
    );
  }

  async sendCreateMessage(message: CreateMessage, entity: string) {
    return await this.sendMessage(message, entity, 'CREATE');
  }

  async sendUpdateMessage(message: UpdateMessage, entity: string) {
    return await this.sendMessage(message, entity, 'UPDATE');
  }

  async sendDeleteMessage(message: DeleteMessage, entity: string) {
    return await this.sendMessage(message, entity, 'DELETE');
  }
}
