import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_REPOSITORY } from './project.constants';
import { Project } from './entities';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { AppListing, OrderDto, Query } from 'src/core';
import { Transaction } from 'sequelize';

type ProjectCreationAdditionalData = {
  transaction?: Transaction;
};

@Injectable()
export class ProjectService {
  public constructor(
    @Inject(PROJECT_REPOSITORY)
    private readonly projectModel: typeof Project,
  ) {}

  public findAll() {
    return this.projectModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof Project, Project>(this.projectModel)
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<Project>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(id: number) {
    return this.projectModel.findOne({ where: { id } });
  }

  public create(
    createProjectDto: CreateProjectDto,
    additionalData?: ProjectCreationAdditionalData,
  ) {
    return this.projectModel.create({ ...createProjectDto }, additionalData);
  }

  public update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.update(updateProjectDto, { where: { id } });
  }

  public remove(id: number) {
    return this.projectModel.destroy({ where: { id } });
  }
}
