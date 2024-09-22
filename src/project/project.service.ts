import { Inject, Injectable } from '@nestjs/common';
import { PROJECT_REPOSITORY } from './project.constants';
import { Project } from './entities';
import { CreateProjectDto, UpdateProjectDto } from './dto';
import { CommonService, CreationAdditionalData } from 'src/common';

@Injectable()
export class ProjectService extends CommonService<Project, typeof Project> {
  public constructor(@Inject(PROJECT_REPOSITORY) model: typeof Project) {
    super(model);
  }

  public create(
    createProjectDto: CreateProjectDto,
    additionalData?: CreationAdditionalData,
  ) {
    return this.model.create({ ...createProjectDto }, additionalData);
  }

  public update(id: number, updateProjectDto: UpdateProjectDto) {
    return this.model.update(updateProjectDto, { where: { id } });
  }
}
