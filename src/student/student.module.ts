import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { studentProviders } from './student.providers';
import { UserModule } from '@app/user';
import { ProjectModule } from '@app/project';
import { ProjectHasCoadvisorModule } from '@app/project-has-coadvisor';

@Module({
  imports: [UserModule, ProjectModule, ProjectHasCoadvisorModule],
  controllers: [StudentController],
  providers: [StudentService, ...studentProviders],
  exports: [StudentService],
})
export class StudentModule {}
