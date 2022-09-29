import { Module } from '@nestjs/common';
import { TriggerHookController } from './trigger-hook.controller';
import { TriggerHookService } from './trigger-hook.service';

@Module({
  providers: [TriggerHookService],
  controllers: [TriggerHookController],
})
export class TriggerHookModule {}
