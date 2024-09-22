import { Body, Query, Param, BadRequestException } from '@nestjs/common';
import { ZodValidationPipe, OrderDto, Filters } from 'src/common';
import {
  SwaggerSafeController,
  SwaggerSafeDelete,
  SwaggerSafeGet,
  SwaggerSafePatch,
  SwaggerSafePost,
} from 'src/common';
import {
  CreatePublicationDto,
  PaginatedPublicationDto,
  UpdatePublicationDto,
  createPublicationSchema,
  updatePublicationSchema,
} from './dto';
import { Can } from 'src/permissions';
import { PublicationService } from './publication.service';
import { Permissions } from './publication.enum';
import { Publication } from './entities';
import { CurrentUser, User } from 'src/user';
import { ROLES } from 'src/roles';

@SwaggerSafeController('publications')
export class PublicationController {
  public constructor(private readonly publicationService: PublicationService) {}

  @SwaggerSafeGet({ type: PaginatedPublicationDto })
  @Can(Permissions.List)
  public findAll(
    @CurrentUser() user: User,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
    @Query('filters') filters: Filters,
  ) {
    return this.publicationService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
      filters,
      user,
    );
  }

  @SwaggerSafeGet({ path: ':id', type: Publication })
  @Can(Permissions.Read)
  public findOne(@Param('id') id: string) {
    return this.publicationService.findOne(+id);
  }

  @SwaggerSafePost({ type: Publication })
  @Can(Permissions.Create)
  public async create(
    @CurrentUser() user: User,
    @Body(new ZodValidationPipe(createPublicationSchema))
    { project_ids, ...createPublicationDto }: CreatePublicationDto,
  ) {
    if (user.is(ROLES.Student)) {
      return this.publicationService.createForStudentUser(
        user,
        createPublicationDto,
      );
    }

    if (!project_ids.length) {
      throw new BadRequestException('O campo de Projetos é obrigatório');
    }

    return this.publicationService.create({
      project_ids,
      ...createPublicationDto,
    });
  }

  @SwaggerSafePatch({ path: ':id' })
  @Can(Permissions.Update)
  public update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePublicationSchema))
    updatePublicationDto: UpdatePublicationDto,
  ) {
    return this.publicationService.update(+id, updatePublicationDto);
  }

  @SwaggerSafeDelete({ path: ':id' })
  @Can(Permissions.Delete)
  public destroy(@Param('id') id: string) {
    return this.publicationService.remove(+id);
  }
}
