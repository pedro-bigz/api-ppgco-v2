import {
  Body,
  Query,
  Param,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import {
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafePost,
  SwaggerSafePatch,
  SwaggerSafeDelete,
  OrderDto,
} from 'src/core';
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
import { RequestUser, User } from 'src/user';
import { ROLES } from 'src/roles';
import { StudentService } from 'src/student';

@SwaggerSafeController('publication')
export class PublicationController {
  public constructor(private readonly publicationService: PublicationService) {}

  @SwaggerSafeGet({ type: PaginatedPublicationDto })
  @Can(Permissions.List)
  public findAll(
    @RequestUser() user: User,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.publicationService.find(
      +page,
      +perPage,
      search,
      searchIn,
      order,
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
    @RequestUser() user: User,
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
