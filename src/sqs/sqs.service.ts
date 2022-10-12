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
    const queueARN = configService.getOrThrow<string>('QUEUE_ARN');

    const [, , service, region, accountId, queueName] = queueARN.split(':');

    this.queueUrl = `https://${service}.${region}.amazonaws.com/${accountId}/${queueName}`;
    this.client = new SQSClient({});
  }

  async sendMessage(message: MessageBody, entity: Entity): Promise<boolean> {
    const messageJson = JSON.stringify(message);

    const output = await this.client.send(
      new SendMessageCommand({
        QueueUrl: this.queueUrl,
        MessageBody: messageJson,
        MessageAttributes: {
          Entity: { DataType: 'String', StringValue: entity },
        },
      }),
    );

    console.log(`SQS message sent with id: ${output.MessageId}`);
    return true;
  }
}
