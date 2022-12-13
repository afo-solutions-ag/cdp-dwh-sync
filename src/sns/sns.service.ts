import { PublishCommand, SNSClient } from '@aws-sdk/client-sns';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SNSConfig } from './sns.config';

export type GenericMessage<
  T extends string = string,
  D extends object = object,
> = {
  type: T;
  system_id: string;
  data: D;
};

@Injectable()
export class SNSService {
  client: SNSClient;
  topicArn: string;

  constructor(configService: ConfigService<SNSConfig>) {
    const topicARN = configService.getOrThrow<string>('SNS_TOPIC_ARN');

    this.topicArn = topicARN;
    this.client = new SNSClient({});
  }

  async sendMessage(message: GenericMessage) {
    const messageJson = JSON.stringify(message);

    try {
      const output = await this.client.send(
        new PublishCommand({
          Message: messageJson,
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
