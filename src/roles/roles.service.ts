import { Inject, Injectable } from '@nestjs/common';
import _capitalize from 'lodash/capitalize';
import { Op } from 'sequelize';
import { AppListing, Query } from '@app/core';
import { ROLES_REPOSITORY } from './roles.constants';
import { Role } from './entities';
import { CreateRolesDto, UpdateRolesDto } from './dto';

@Injectable()
export class RolesService {
  public constructor(
    @Inject(ROLES_REPOSITORY)
    private readonly roleModel: typeof Role,
  ) {}

  public findAll() {
    return this.roleModel.findAll();
  }

  public async find(
    page: number,
    perPage: number,
    search: string,
    searchIn: string = 'id',
    order: Record<string, 'ASC' | 'DESC'>,
  ) {
    return AppListing.create<typeof Role>(this.roleModel)
      ?.attachPagination(page, perPage)
      ?.attachOrderObj(order || { id: 'DESC' })
      ?.attachSearch(search, searchIn)
      ?.modifyQuery((query: Query) => {
        return {
          ...query,
        };
      })
      ?.get<Role>();
  }

  public findOne(id: number) {
    return this.roleModel.findOne({ where: { id } });
  }

  public create(createRolesDto: CreateRolesDto) {
    return this.roleModel.create({ ...createRolesDto });
  }

  public update(id: number, updateRolesDto: UpdateRolesDto) {
    return this.roleModel.update(updateRolesDto, { where: { id } });
  }

  public findByName(name: string) {
    return this.roleModel.findOne({
      where: { name: _capitalize(name) },
    });
  }

  public findByNameList(names: string[]) {
    return this.roleModel.findAll({
      where: {
        name: {
          [Op.in]: names.map(_capitalize),
        },
      },
    });
  }

  // public remove(id: number) {
  //   return this.roleModel.destroy({ where: { id } });
  // }
}
