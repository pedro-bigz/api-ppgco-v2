import { Inject, Injectable } from '@nestjs/common';
import { PUBLICATION_REPOSITORY } from './publication.constants';
import { Publication } from './entities';
import { CreatePublicationDto, UpdatePublicationDto } from './dto';
import { AppListing, Query } from 'core';

@Injectable()
export class PublicationService {
  public constructor(
    @Inject(PUBLICATION_REPOSITORY)
    private readonly publicationModel: typeof Publication,
  ) {}

  public findAll() {
    return this.publicationModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return AppListing.create<typeof Publication>(this.publicationModel)
      ?.attachPagination(page, perPage)
      ?.attachOrderObj(order || { id: 'DESC' })
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query) => {
        return {
          ...query,
        };
      })
      ?.get<Publication>();
  }

  public findOne(id: number) {
    return this.publicationModel.findOne({ where: { id } });
  }

  public create(createPublicationDto: CreatePublicationDto) {
    return this.publicationModel.create({ ...createPublicationDto });
  }

  public update(id: number, updatePublicationDto: UpdatePublicationDto) {
    return this.publicationModel.update(updatePublicationDto, { where: { id } });
  }

  public remove(id: number) {
    return this.publicationModel.destroy({ where: { id } });
  }
}
