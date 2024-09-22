import { Query } from '@nestjs/common';
import { OrderDto } from 'src/common';
import { SwaggerSafeController, SwaggerSafeGet } from 'src/common';
import { Can } from 'src/permissions';
import { RolesService } from './roles.service';
import { Permissions } from './roles.enum';
import { PaginatedRoleDto } from './dto';

@SwaggerSafeController('roles')
export class RolesController {
  public constructor(private rolesService: RolesService) {}

  @SwaggerSafeGet({ type: PaginatedRoleDto })
  @Can(Permissions.List)
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
