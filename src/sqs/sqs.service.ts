import { SendMessageCommand, SQSClient } from '@aws-sdk/client-sqs';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SQSConfig } from './sqs.config';

type Entity = 'USER' | 'UNIT' | 'SYSTEM' | 'REDSHIFT_CONFIGURATION';
type MessageBody = { systemId: string };

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

  async sendMessage(message: MessageBody, entity: Entity) {
    const messageJson = JSON.stringify(message);

    return await this.client.send(
      new SendMessageCommand({
        QueueUrl: this.queueUrl,
        MessageBody: messageJson,
        MessageAttributes: {
          Entity: { DataType: 'String', StringValue: entity },
        },
      }),
    );
  }
}
