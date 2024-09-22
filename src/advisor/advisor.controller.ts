import { Body, Query, Param } from '@nestjs/common';
import { ZodValidationPipe, OrderDto, Filters } from 'src/common';
import {
  SwaggerSafeController,
  SwaggerSafeDelete,
  SwaggerSafeGet,
  SwaggerSafePatch,
  SwaggerSafePost,
} from 'src/common';
import { AdvisorService } from './advisor.service';
import {
  CreateAdvisorByListDto,
  CreateAdvisorDto,
  PaginatedAdvisorDto,
  UpdateAdvisorDto,
  createAdvisorByListSchema,
  createAdvisorSchema,
  updateAdvisorSchema,
} from './dto';
import { Can } from 'src/permissions';
import { Permissions } from './advisor.enum';
import { Advisor } from './entities';

@SwaggerSafeController('advisors')
export class AdvisorController {
  public constructor(private readonly advisorService: AdvisorService) {}

  @SwaggerSafeGet({ type: PaginatedAdvisorDto })
  @Can(Permissions.List)
  public async findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
    @Query('filters') filters: Filters,
  ) {
    return this.advisorService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
      filters,
    );
  }

  @SwaggerSafeGet({ path: ':id', type: Advisor })
  @Can(Permissions.Read)
  public findOne(@Param('id') id: string) {
    return this.advisorService.findOne(+id);
  }

  @SwaggerSafePost({ type: Advisor })
  @Can(Permissions.Create)
  public create(
    @Body(new ZodValidationPipe(createAdvisorSchema))
    createAdvisorDto: CreateAdvisorDto,
  ) {
    return this.advisorService.create(createAdvisorDto);
  }

  @SwaggerSafePatch({ path: ':id' })
  @Can(Permissions.Update)
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updateAdvisorSchema))
    updateAdvisorDto: UpdateAdvisorDto,
  ) {
    const [updateds] = await this.advisorService.update(+id, updateAdvisorDto);
    return {
      updateds,
      message: 'Item atualizado com sucesso',
    };
  }

  @SwaggerSafeDelete({ path: ':id' })
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    return this.advisorService.remove(+id);
  }
}
