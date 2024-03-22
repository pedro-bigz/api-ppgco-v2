import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_HAS_COADVISOR_REPOSITORY } from './project-has-coadvisor.constants';
import { ProjectHasCoadvisor } from './entities';
import {
  CreateProjectHasCoadvisorDto,
  UpdateProjectHasCoadvisorDto,
} from './dto';
import { AppListing, Query } from 'core';

@Injectable()
export class ProjectHasCoadvisorService {
  public constructor(
    @Inject(PROJECT_HAS_COADVISOR_REPOSITORY)
    private readonly projectHasCoadvisorModel: typeof ProjectHasCoadvisor,
  ) {}

  public findAll() {
    return this.projectHasCoadvisorModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return AppListing.create<typeof ProjectHasCoadvisor>(
      this.projectHasCoadvisorModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachOrderObj(order || { id: 'DESC' })
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query) => {
        return {
          ...query,
        };
      })
      ?.get<ProjectHasCoadvisor>();
  }

  public findOne(id: number) {
    return this.projectHasCoadvisorModel.findOne({ where: { id } });
  }

  public create(createProjectHasCoadvisorDto: CreateProjectHasCoadvisorDto) {
    return this.projectHasCoadvisorModel.create({
      ...createProjectHasCoadvisorDto,
    });
  }

  public update(
    id: number,
    updateProjectHasCoadvisorDto: UpdateProjectHasCoadvisorDto,
  ) {
    return this.projectHasCoadvisorModel.update(updateProjectHasCoadvisorDto, {
      where: { id },
    });
  }

  public remove(id: number) {
    return this.projectHasCoadvisorModel.destroy({ where: { id } });
  }
}
