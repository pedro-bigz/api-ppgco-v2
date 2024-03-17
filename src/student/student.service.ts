import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { STUDENT_REPOSITORY } from './student.constants';
import { Student } from './entities';
import { CreateStudentDto, UpdateStudentDto } from './dto';
import { AppListing, Query } from 'core';
import { UserService } from '@app/user';

@Injectable()
export class StudentService {
  public constructor(
    @Inject(STUDENT_REPOSITORY)
    private readonly studentModel: typeof Student,
    private readonly userService: UserService,
  ) {}

  public findAll() {
    return this.studentModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return AppListing.create<typeof Student>(this.studentModel)
      ?.attachPagination(page, perPage)
      ?.attachOrderObj(order || { id: 'DESC' })
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query) => {
        return {
          ...query,
        };
      })
      ?.get<Student>();
  }

  public findOne(id: number) {
    return this.studentModel.findOne({ where: { id } });
  }

  public async create(createStudentDto: CreateStudentDto) {
    const { first_name, last_name, email, password, ...studentDto } =
      createStudentDto;

    const user = await this.userService.create({
      first_name,
      last_name,
      email,
      password,
    });

    console.log(user);
    console.log({
      ...studentDto,
      user_id: user.dataValues.id,
    });

    return this.studentModel.create({
      ...studentDto,
      user_id: user.dataValues.id,
    });
  }

  public async update(id: number, updateStudentDto: UpdateStudentDto) {
    const student = await this.findOne(id);

    if (!student) {
      throw new NotFoundException('Student not found');
    }

    const { first_name, last_name, email, password, ...studentDto } =
      updateStudentDto;

    const userPromise = this.userService.update(student.user_id, {
      first_name,
      last_name,
      email,
      password,
    });

    const studentPromise = this.studentModel.update(studentDto, {
      where: { id },
    });

    return Promise.all([userPromise, studentPromise]);
  }

  public remove(id: number) {
    return this.studentModel.destroy({ where: { id } });
  }
}
