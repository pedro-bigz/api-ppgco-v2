import { Controller, Get, Query } from '@nestjs/common';
import { OrderDto } from 'src/core';
import { Can } from 'src/permissions';
import { RolesService } from './roles.service';
import { Permissions } from './roles.enum';
import { PaginatedRoleDto } from './dto';
import { ApiOkResponse } from '@nestjs/swagger';

@Controller('roles')
export class RolesController {
  public constructor(private rolesService: RolesService) {}

  @Get()
  @Can(Permissions.List)
  @ApiOkResponse({ type: PaginatedRoleDto })
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.rolesService.find(+page, +perPage, search, searchIn, order);
  }
}
