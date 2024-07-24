import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { studentProviders } from './student.providers';
import { UserModule } from 'src/user';
import { ProjectModule } from 'src/project';
import { ProjectHasCoadvisorModule } from 'src/project-has-coadvisor';
import { MilestoneModule } from 'src/milestone';

@Module({
  imports: [
    UserModule,
    ProjectModule,
    MilestoneModule,
    ProjectHasCoadvisorModule,
  ],
  controllers: [StudentController],
  providers: [StudentService, ...studentProviders],
  exports: [StudentService],
})
export class StudentModule {}
