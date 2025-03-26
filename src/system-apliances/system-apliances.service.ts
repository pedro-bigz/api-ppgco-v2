import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { SYSTEM_APLIANCES_REPOSITORY } from './system-apliances.constants';
import { SystemApliance } from './entities';
import { CreateSystemApliancesDto, UpdateSystemApliancesDto } from './dto';
import { CommonListing, CommonService, OrderDto, Query } from 'src/core';
import { Op } from 'sequelize';

@Injectable()
export class SystemApliancesService extends CommonService<
  SystemApliance,
  typeof SystemApliance
> {
  public constructor(
    @Inject(SYSTEM_APLIANCES_REPOSITORY) model: typeof SystemApliance,
  ) {
    super(model);
  }

  public findLike(key: string) {
    return this.model.findAll({
      where: { sa_key: { [Op.like]: key } },
    });
  }

  public findApliances(key: string) {
    return this.model.findAll({
      where: { sa_key: key },
    });
  }

  public findApliance(key: string) {
    return this.model.findOne({ where: { sa_key: key } });
  }

  public async findAplianceValue(key: string) {
    const apliance = await this.model.findOne({ where: { sa_key: key } });

    if (!apliance) {
      throw new NotFoundException('Appliance not found');
    }

    return apliance.sa_value;
  }

  public set(sa_key: string, sa_value: string) {
    return this.model.create({ sa_key, sa_value });
  }

  public create(createSystemApliancesDto: CreateSystemApliancesDto) {
    return this.model.create({ ...createSystemApliancesDto });
  }

  public update(
    id: number,
    updateSystemApliancesDto: UpdateSystemApliancesDto,
  ) {
    return this.model.update(updateSystemApliancesDto, {
      where: { id },
    });
  }

  public updateFrom(key: string, value: string) {
    return this.model.update({ sa_value: value }, { where: { sa_key: key } });
  }
}
