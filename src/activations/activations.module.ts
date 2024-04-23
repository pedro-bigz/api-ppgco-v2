import { Module } from '@nestjs/common';
import { ActivationsService } from './activations.service';
import { UserModule } from '@app/user';
import { activationsProviders } from './activations.providers';

@Module({
  providers: [ActivationsService, ...activationsProviders],
  exports: [ActivationsService],
})
export class ActivationsModule {}
