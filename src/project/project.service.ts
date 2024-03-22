import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_REPOSITORY } from './project.constants';
import { Project } from './entities';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { AppListing, Query } from 'core';

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
    order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return AppListing.create<typeof Project>(this.projectModel)
      ?.attachPagination(page, perPage)
      ?.attachOrderObj(order || { id: 'DESC' })
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query) => {
        return {
          ...query,
        };
      })
      ?.get<Project>();
  }

  public findOne(id: number) {
    return this.projectModel.findOne({ where: { id } });
  }

  public create(createProjectDto: CreateProjectDto) {
    return this.projectModel.create({ ...createProjectDto });
  }

  public update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.projectModel.update(updateProjectDto, { where: { id } });
  }

  public remove(id: number) {
    return this.projectModel.destroy({ where: { id } });
  }
}
