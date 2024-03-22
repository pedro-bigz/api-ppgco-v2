import { Module } from '@nestjs/common';
import { DisconnectedStudentService } from './disconnected-student.service';
import { DisconnectedStudentController } from './disconnected-student.controller';
import { disconnectedStudentProviders } from './disconnected-student.providers';

@Module({
  controllers: [DisconnectedStudentController],
  providers: [DisconnectedStudentService, ...disconnectedStudentProviders],
})
export class DisconnectedStudentModule {}
