import {
  BelongsTo,
  BelongsToMany,
  Column,
  CreatedAt,
  DataType,
  ForeignKey,
  Model,
  Table,
  UpdatedAt,
} from 'sequelize-typescript';
import { Student } from 'src/student/entities';
import { Subject } from 'src/subjects/entities';
import { StudyPlanSubject } from './study-plan-subject.entity';
import { ApiProperty } from '@nestjs/swagger';

@Table({ tableName: 'study_plan' })
export class StudyPlan extends Model {
  @ApiProperty()
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @ApiProperty()
  @ForeignKey(() => Student)
  @Column({ allowNull: false })
  student_id: number;

  @ApiProperty({ enum: ['PENDING', 'APPROVED', 'REJECTED'] })
  @Column({
    type: DataType.ENUM('PENDING', 'APPROVED', 'REJECTED'),
    defaultValue: 'PENDING',
    allowNull: false,
  })
  status: 'PENDING' | 'APPROVED' | 'REJECTED';

  @ApiProperty()
  @Column({ type: DataType.TEXT, allowNull: true })
  justification: string;

  @ApiProperty()
  @Column({ type: DataType.TEXT, allowNull: true })
  approved_subject_ids: string;

  @ApiProperty()
  @CreatedAt
  created_at: Date;

  @ApiProperty()
  @UpdatedAt
  updated_at: Date;

  @BelongsTo(() => Student)
  student: Student;

  @BelongsToMany(() => Subject, () => StudyPlanSubject)
  subjects: Subject[];
}
