import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { studentProviders } from './student.providers';
import { UserModule } from '@app/user';

@Module({
  imports: [UserModule],
  controllers: [StudentController],
  providers: [StudentService, ...studentProviders],
})
export class StudentModule {}
