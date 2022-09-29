import { Module } from '@nestjs/common';
import { TriggerHookModule } from './trigger-hook/trigger-hook.module';

@Module({
  imports: [TriggerHookModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
