import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SNSModule } from '../sns/sns.module';
import { SNSService } from '../sns/sns.service';
import { GraphQLModule } from '../graphql/graphql.module';
import { GraphQLService } from '../graphql/graphql.service';
import { TriggerHookController } from './trigger-hook.controller';
import { TriggerHookService } from './trigger-hook.service';

@Module({
  imports: [GraphQLModule, SNSModule],
  providers: [TriggerHookService, SNSService, GraphQLService, ConfigService],
  controllers: [TriggerHookController],
})
export class TriggerHookModule {}
