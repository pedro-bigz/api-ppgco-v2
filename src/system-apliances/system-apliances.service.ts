import { Inject, Injectable } from '@nestjs/common';
import { SYSTEM_APLIANCES_REPOSITORY } from './system-apliances.constants';
import { SystemApliance } from './entities';
import { CreateSystemApliancesDto, UpdateSystemApliancesDto } from './dto';
import { AppListing, OrderDto, Query } from 'src/core';
import { Op } from 'sequelize';

@Injectable()
export class SystemApliancesService {
  public constructor(
    @Inject(SYSTEM_APLIANCES_REPOSITORY)
    private readonly systemAplianceModel: typeof SystemApliance,
  ) {}

  public findAll() {
    return this.systemAplianceModel.findAll();
  }

  public async findPaginated(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: OrderDto[],
  ) {
    return AppListing.create<typeof SystemApliance, SystemApliance>(
      this.systemAplianceModel,
    )
      ?.attachPagination(page, perPage)
      ?.attachMultipleOrder(order || [['id', 'DESC']])
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query<SystemApliance>) => {
        return {
          ...query,
        };
      })
      ?.get();
  }

  public findLike(key: string) {
    return this.systemAplianceModel.findAll({
      where: { sa_key: { [Op.like]: key } },
    });
  }

  public findApliances(key: string) {
    return this.systemAplianceModel.findAll({
      where: { sa_key: key },
    });
  }

  public findApliance(key: string) {
    return this.systemAplianceModel.findOne({ where: { sa_key: key } });
  }

  public findOne(id: number) {
    return this.systemAplianceModel.findOne({ where: { id } });
  }

  public create(createSystemApliancesDto: CreateSystemApliancesDto) {
    return this.systemAplianceModel.create({ ...createSystemApliancesDto });
  }

  public update(
    id: number,
    updateSystemApliancesDto: UpdateSystemApliancesDto,
  ) {
    return this.systemAplianceModel.update(updateSystemApliancesDto, {
      where: { id },
    });
  }

  public updateFrom(key: string, value: string) {
    return this.systemAplianceModel.update(
      { sa_value: value },
      { where: { sa_key: key } },
    );
  }

  public remove(id: number) {
    return this.systemAplianceModel.destroy({ where: { id } });
  }
}
