import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SNSConfig } from './sns.config';

type Entity = 'USER' | 'UNIT' | 'SYSTEM' | 'REDSHIFT_CONFIGURATION';
type MessageBody = { systemId: string };

@Injectable()
export class SNSService {
  client: SNSClient;
  //   topicUrl: string;
  topicArn: string;

  constructor(configService: ConfigService<SNSConfig>) {
    const topicARN = configService.getOrThrow<string>('SNS_TOPIC_ARN');

    // const [, , service, region, accountId, topicName] = topicARN.split(':');

    this.topicArn = topicARN;
    // this.topicUrl = `https://${service}.${region}.amazonaws.com/${accountId}/${topicName}`;
    this.client = new SNSClient({});
  }

  async sendMessage(message: MessageBody, entity: Entity) {
    const messageJson = JSON.stringify(message);

    try {
      const output = await this.client.send(
        new PublishCommand({
          Message: messageJson,
          MessageAttributes: {
            Entity: { DataType: 'String', StringValue: entity },
          },
          TopicArn: this.topicArn,
        }),
      );

      console.log(`SNS message sent with id: ${output.MessageId}`);
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  }
}
