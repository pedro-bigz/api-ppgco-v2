import {
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import _flatMap from 'lodash/flatMap';
import {
  CommonListing,
  CommonService,
  Filters,
  OrderDto,
  Query,
} from 'src/core';
import { User } from 'src/user';
import { StudentService } from 'src/student';
import { PublicationCoauthorsService } from 'src/publication-coauthors';
import {
  PUBLICATION_REPOSITORY,
  V_PUBLICATION_REPOSITORY,
} from './publication.constants';
import { Publication, VPublication } from './entities';
import { CreatePublicationDto, UpdatePublicationDto } from './dto';
import { Attributes, FindOptions } from 'sequelize';

@Injectable()
export class PublicationService {
  public constructor(
    @Inject(PUBLICATION_REPOSITORY) private readonly model: typeof Publication,
    @Inject(V_PUBLICATION_REPOSITORY)
    private readonly view: typeof VPublication,
    private readonly sequelize: Sequelize,
    private readonly studentService: StudentService,
    private readonly publicationCoauthorService: PublicationCoauthorsService,
  ) {}

  public findAll(options?: FindOptions<Attributes<Publication>>) {
    return this.model.findAll(options);
  }

  public getListing() {
    return CommonListing.create<VPublication, typeof VPublication>(this.view);
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string,
    order: OrderDto[],
    filters?: Filters,
    user?: User,
  ) {
    console.log({ user });
    return this.getListing()
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order)
      ?.attachSearch(search, searchIn)
      ?.attachFilters(filters ?? {})
      ?.get();
  }

  public findOne(id: number, options?: FindOptions<Attributes<Publication>>) {
    return this.model.findOne({
      where: { id, ...(options?.where ?? {}) },
      ...options,
    });
  }

  public findOneFullData(id: number) {
    return this.model.scope('full').findOne({ where: { id } });
  }

  public findOneByScope(scope: string, id: number) {
    return this.model.scope(scope).findOne({ where: { id } });
  }

  public remove(id: number): Promise<number> | void {
    return this.model.destroy({ where: { id } });
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

    return this.model.create({
      project_ids: [project.id],
      ...createPublicationDto,
    });
  }

  public async create({
    project_ids: projectIds,
    coauthors,
    ...createPublicationDto
  }: CreatePublicationDto) {
    const publications = await this.sequelize.transaction(
      async (transaction) => {
        const publications = await this.model.bulkCreate(
          projectIds.map((projectId: number) => ({
            project_id: projectId,
            ...createPublicationDto,
          })),
          { transaction },
        );

        await this.publicationCoauthorService.bulkCreate(
          _flatMap(publications, (publication: Publication) =>
            coauthors.map((coauthor: Publication) => ({
              ...coauthor,
              publication_id: publication.dataValues.id,
            })),
          ),
          { transaction },
        );

        return publications;
      },
    );

    return publications;
  }

  public update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return this.model.update(updatePublicationDto, {
      where: { id },
    });
  }
}
