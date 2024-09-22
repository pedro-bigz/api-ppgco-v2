import { Inject, Injectable } from '@nestjs/common';
import { PUBLICATION_COAUTHORS_REPOSITORY } from './publication-coauthors.constants';
import { PublicationCoauthor } from './entities';
import {
  CreatePublicationCoauthorsDto,
  UpdatePublicationCoauthorsDto,
} from './dto';
import { Attributes, CreateOptions } from 'sequelize';

@Injectable()
export class PublicationCoauthorsService {
  public constructor(
    @Inject(PUBLICATION_COAUTHORS_REPOSITORY)
    private readonly model: typeof PublicationCoauthor,
  ) {}

  public create(
    createPublicationCoauthorsDto: CreatePublicationCoauthorsDto,
    options: CreateOptions<Attributes<PublicationCoauthor>>,
  ) {
    return this.model.create({ ...createPublicationCoauthorsDto }, options);
  }

  public bulkCreate(
    createPublicationCoauthorsDto: CreatePublicationCoauthorsDto[],
    options: CreateOptions<Attributes<PublicationCoauthor>>,
  ) {
    return this.model.bulkCreate(
      createPublicationCoauthorsDto.map((dto) => ({ ...dto })),
      options,
    );
  }

  public update(
    id: number,
    updatePublicationCoauthorsDto: UpdatePublicationCoauthorsDto,
  ) {
    return this.model.update(updatePublicationCoauthorsDto, {
      where: { id },
    });
  }

  public remove(id: number) {
    return this.model.destroy({ where: { id } });
  }
}
