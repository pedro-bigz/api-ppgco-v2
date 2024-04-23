import { Inject, Injectable } from '@nestjs/common';
import { RESEARCH_LINE_REPOSITORY } from './research-line.constants';
import { ResearchLine } from './entities';
import { CreateResearchLineDto, UpdateResearchLineDto } from './dto';
import { AppListing, Query } from '@app/core';

@Injectable()
export class ResearchLineService {
  public constructor(
    @Inject(RESEARCH_LINE_REPOSITORY)
    private readonly researchLineModel: typeof ResearchLine,
  ) {}

  public findAll() {
    return this.researchLineModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return AppListing.create<typeof ResearchLine>(this.researchLineModel)
      ?.attachPagination(page, perPage)
      ?.attachOrderObj(order || { id: 'DESC' })
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query) => {
        return {
          ...query,
        };
      })
      ?.get<ResearchLine>();
  }

  public findOne(id: number) {
    return this.researchLineModel.findOne({ where: { id } });
  }

  public create(createResearchLineDto: CreateResearchLineDto) {
    return this.researchLineModel.create({ ...createResearchLineDto });
  }

  public update(id: number, updateResearchLineDto: UpdateResearchLineDto) {
    return this.researchLineModel.update(updateResearchLineDto, {
      where: { id },
    });
  }

  public remove(id: number) {
    return this.researchLineModel.destroy({ where: { id } });
  }
}
