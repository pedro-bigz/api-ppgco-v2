import { Inject, Injectable } from '@nestjs/common';
import { PUBLICATION_PROJECT_REPOSITORY } from './publication-project.constants';
import { PublicationProject } from './entities';
import {
  CreatePublicationProjectDto,
  UpdatePublicationProjectDto,
} from './dto';
import { AppListing, OrderDto, Query } from 'src/core';

@Injectable()
export class PublicationProjectService {
  public constructor(
    @Inject(PUBLICATION_PROJECT_REPOSITORY)
    private readonly publicationProjectModel: typeof PublicationProject,
  ) {}

  public findAll() {
    return this.publicationProjectModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof PublicationProject, PublicationProject>(
      this.publicationProjectModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<PublicationProject>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findOne(id: number) {
    return this.publicationProjectModel.findOne({ where: { id } });
  }

  public create(createPublicationProjectDto: CreatePublicationProjectDto) {
    return this.publicationProjectModel.create({
      ...createPublicationProjectDto,
    });
  }

  public update(
    id: number,
    updatePublicationProjectDto: UpdatePublicationProjectDto,
  ) {
    return this.publicationProjectModel.update(updatePublicationProjectDto, {
      where: { id },
    });
  }

  public remove(id: number) {
    return this.publicationProjectModel.destroy({ where: { id } });
  }
}
