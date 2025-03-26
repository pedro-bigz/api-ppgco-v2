import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import _capitalize from 'lodash/capitalize';
import { Includeable, Op } from 'sequelize';
import { CommonListing, CommonService, OrderDto, Query } from 'src/core';
import { ROLES_REPOSITORY } from './roles.constants';
import { Role } from './entities';
import { CreateRolesDto, UpdateRolesDto } from './dto';

@Injectable()
export class RolesService extends CommonService<Role, typeof Role> {
  public constructor(@Inject(ROLES_REPOSITORY) model: typeof Role) {
    super(model);
  }

  public create(createRolesDto: CreateRolesDto) {
    return this.model.create({ ...createRolesDto });
  }

  public update(id: number, updateRolesDto: UpdateRolesDto) {
    return this.model.update(updateRolesDto, { where: { id } });
  }

  public findByName(name: string) {
    return this.model.findOne({
      where: { name: _capitalize(name) },
    });
  }

  public findByNameList(names: string[]) {
    return this.model.findAll({
      where: {
        name: {
          [Op.in]: names.map(_capitalize),
        },
      },
    });
  }

  public remove(_id: number) {
    throw new NotImplementedException();
  }
}
