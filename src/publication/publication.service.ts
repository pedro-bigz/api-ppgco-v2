import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PUBLICATION_REPOSITORY } from './publication.constants';
import { Publication } from './entities';
import { CreatePublicationDto, UpdatePublicationDto } from './dto';
import { AppListing, OrderDto, Query } from 'src/core';
import { User } from 'src/user';
import { StudentService } from 'src/student';
import { ROLES } from 'src/roles';

@Injectable()
export class PublicationService {
  public constructor(
    @Inject(PUBLICATION_REPOSITORY)
    private readonly publicationModel: typeof Publication,
    private readonly studentService: StudentService,
  ) {}

  public findAll() {
    return this.publicationModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
    user: User,
  ) {
    return AppListing.create<typeof Publication, Publication>(
      this.publicationModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<Publication>) => {
        // if (user.is(ROLES.Student)) {
        //   query.where[];
        // }
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(id: number) {
    return this.publicationModel.findOne({ where: { id } });
  }

  public async createForStudentUser(
    user: User,
    createPublicationDto: CreatePublicationDto,
  ) {
    const student = await this.studentService.findFromUser(user);

    if (!student) {
      throw new InternalServerErrorException(
        'Não foi possível encontrar os dados necessários para efetuar a solicitação',
      );
    }

    const { dataValues: project } = student.dataValues.project;

    return this.create({
      project_ids: [project.id],
      ...createPublicationDto,
    });
  }

  public create({
    project_ids: projectIds,
    ...createPublicationDto
  }: CreatePublicationDto) {
    const newRegisters = projectIds.map((projectId: number) => ({
      project_id: projectId,
      ...createPublicationDto,
    }));
    return this.publicationModel.bulkCreate(newRegisters);
  }

  public update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return this.publicationModel.update(updatePublicationDto, {
      where: { id },
    });
  }

  public remove(id: number) {
    return this.publicationModel.destroy({ where: { id } });
  }
}
