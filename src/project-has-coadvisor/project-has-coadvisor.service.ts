import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_HAS_COADVISOR_REPOSITORY } from './project-has-coadvisor.constants';
import { ProjectHasCoadvisor } from './entities';
import {
  CreateProjectHasCoadvisorDto,
  UpdateProjectHasCoadvisorDto,
} from './dto';
import { CommonService, CreationAdditionalData } from 'src/core';
import { Optional, Transaction } from 'sequelize';
import { Op } from 'sequelize';

@Injectable()
export class ProjectHasCoadvisorService extends CommonService<
  ProjectHasCoadvisor,
  typeof ProjectHasCoadvisor
> {
  public constructor(
    @Inject(PROJECT_HAS_COADVISOR_REPOSITORY) model: typeof ProjectHasCoadvisor,
  ) {
    super(model);
  }

  public async findFrom(projectId: number) {
    const coadvisors = await this.model.findAll({
      where: { project_id: projectId },
    });

    return coadvisors;
  }

  public async findFromDeleteds(projectId: number) {
    const coadvisors = await this.model.scope('withTrashed').findAll({
      where: { project_id: projectId, deleted_at: { [Op.not]: null } },
    });

    return coadvisors;
  }

  public async findFromWithDeleteds(projectId: number) {
    const coadvisors = await this.model.scope('withTrashed').findAll({
      where: { project_id: projectId },
    });

    return coadvisors;
  }

  public create(
    createProjectHasCoadvisorDto: CreateProjectHasCoadvisorDto,
    additionalData?: CreationAdditionalData,
  ) {
    return this.model.create(
      {
        ...createProjectHasCoadvisorDto,
      },
      additionalData,
    );
  }

  public bulkCreate(
    createProjectHasCoadvisorDto: CreateProjectHasCoadvisorDto[],
    additionalData?: CreationAdditionalData,
  ) {
    return this.model.bulkCreate(
      createProjectHasCoadvisorDto as Optional<any, string>[],
      additionalData,
    );
  }

  public update(
    id: number,
    updateProjectHasCoadvisorDto: UpdateProjectHasCoadvisorDto,
  ) {
    return this.model.update(updateProjectHasCoadvisorDto, {
      where: { id },
    });
  }

  public removeAdvisorFrom(advisorsId: number, projectId: number) {
    return this.model.destroy({
      where: { advisor_id: advisorsId, project_id: projectId },
    });
  }

  public removeMultipleAdvisorFrom(
    advisorsIdList: number[],
    projectId: number,
  ) {
    return this.model.destroy({
      where: { advisor_id: { [Op.in]: advisorsIdList }, project_id: projectId },
    });
  }

  public removeFrom(projectId: number) {
    return this.model.destroy({
      where: { project_id: projectId },
    });
  }
}
