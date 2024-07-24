import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_HAS_COADVISOR_REPOSITORY } from './project-has-coadvisor.constants';
import { ProjectHasCoadvisor } from './entities';
import {
  CreateProjectHasCoadvisorDto,
  UpdateProjectHasCoadvisorDto,
} from './dto';
import { AppListing, OrderDto, Query } from 'src/core';
import { Optional, Transaction } from 'sequelize';
import { Op } from 'sequelize';

type CoadvisorCreationAdditionalData = {
  transaction?: Transaction;
};

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
    order: OrderDto[],
  ) {
    return AppListing.create<typeof ProjectHasCoadvisor, ProjectHasCoadvisor>(
      this.projectHasCoadvisorModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<ProjectHasCoadvisor>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(id: number) {
    return this.projectHasCoadvisorModel.findOne({ where: { id } });
  }

  public async findFrom(projectId: number) {
    const coadvisors = await this.projectHasCoadvisorModel.findAll({
      where: { project_id: projectId },
    });

    return coadvisors;
  }

  public async findFromDeleteds(projectId: number) {
    const coadvisors = await this.projectHasCoadvisorModel
      .scope('withTrashed')
      .findAll({
        where: { project_id: projectId, deleted_at: { [Op.not]: null } },
      });

    return coadvisors;
  }

  public async findFromWithDeleteds(projectId: number) {
    const coadvisors = await this.projectHasCoadvisorModel
      .scope('withTrashed')
      .findAll({
        where: { project_id: projectId },
      });

    return coadvisors;
  }

  public create(
    createProjectHasCoadvisorDto: CreateProjectHasCoadvisorDto,
    additionalData?: CoadvisorCreationAdditionalData,
  ) {
    return this.projectHasCoadvisorModel.create(
      {
        ...createProjectHasCoadvisorDto,
      },
      additionalData,
    );
  }

  public bulkCreate(
    createProjectHasCoadvisorDto: CreateProjectHasCoadvisorDto[],
    additionalData?: CoadvisorCreationAdditionalData,
  ) {
    return this.projectHasCoadvisorModel.bulkCreate(
      createProjectHasCoadvisorDto as Optional<any, string>[],
      additionalData,
    );
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

  public removeAdvisorFrom(advisorsId: number, projectId: number) {
    return this.projectHasCoadvisorModel.destroy({
      where: { advisor_id: advisorsId, project_id: projectId },
    });
  }

  public removeMultipleAdvisorFrom(
    advisorsIdList: number[],
    projectId: number,
  ) {
    return this.projectHasCoadvisorModel.destroy({
      where: { advisor_id: { [Op.in]: advisorsIdList }, project_id: projectId },
    });
  }

  public removeFrom(projectId: number) {
    return this.projectHasCoadvisorModel.destroy({
      where: { project_id: projectId },
    });
  }
}
