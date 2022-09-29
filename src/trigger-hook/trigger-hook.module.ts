import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SQSModule } from 'src/sqs/sqs.module';
import { SQSService } from 'src/sqs/sqs.service';
import { TriggerHookController } from './trigger-hook.controller';
import { TriggerHookService } from './trigger-hook.service';

@Module({
  imports: [SQSModule],
  providers: [TriggerHookService, SQSService, ConfigService],
  controllers: [TriggerHookController],
})
export class TriggerHookModule {}
