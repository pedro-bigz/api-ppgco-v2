import { Inject, Injectable } from '@nestjs/common';
import { ADVISOR_REPOSITORY } from './advisor.constants';
import { Advisor } from './entities';
import { CreateAdvisorDto, UpdateAdvisorDto } from './dto';
import { AppListing, Query } from '@app/core';

@Injectable()
export class AdvisorService {
  public constructor(
    @Inject(ADVISOR_REPOSITORY)
    private readonly advisorModel: typeof Advisor,
  ) {}

  public findAll() {
    return this.advisorModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return AppListing.create<typeof Advisor>(this.advisorModel)
      ?.attachPagination(page, perPage)
      ?.attachOrderObj(order || { id: 'DESC' })
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query) => {
        return {
          ...query,
        };
      })
      ?.get<Advisor>();
  }

  public findOne(id: number) {
    return this.advisorModel.findOne({ where: { id } });
  }

  public create(createAdvisorDto: CreateAdvisorDto) {
    return this.advisorModel.create({ ...createAdvisorDto });
  }

  public update(id: number, updateAdvisorDto: UpdateAdvisorDto) {
    return this.advisorModel.update(updateAdvisorDto, { where: { id } });
  }

  public remove(id: number) {
    return this.advisorModel.destroy({ where: { id } });
  }
}
