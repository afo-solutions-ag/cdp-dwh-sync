import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '../graphql/graphql.module';
import { GraphQLService } from '../graphql/graphql.service';
import { SQSModule } from '../sqs/sqs.module';
import { SQSService } from '../sqs/sqs.service';
import { TriggerHookController } from './trigger-hook.controller';
import { TriggerHookService } from './trigger-hook.service';

@Module({
  imports: [SQSModule, GraphQLModule],
  providers: [TriggerHookService, SQSService, GraphQLService, ConfigService],
  controllers: [TriggerHookController],
})
export class TriggerHookModule {}
