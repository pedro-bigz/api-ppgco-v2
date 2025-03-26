import {
  Body,
  Query,
  Param,
  BadRequestException,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ZodValidationPipe,
  OrderDto,
  Filters,
  DeleteSuccessResponse,
  UpdateSuccessResponse,
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
import { CurrentUser, User } from 'src/user';
import { ROLES } from 'src/roles';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';

@Controller('publications')
export class PublicationController {
  public constructor(private readonly publicationService: PublicationService) {}

  @Get()
  @ApiOkResponse({ type: PaginatedPublicationDto })
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

  @Get(':id')
  @Can(Permissions.Read)
  @ApiOkResponse({ type: Publication })
  public findOne(@Param('id') id: string) {
    return this.publicationService.findOne(+id);
  }

  @Post()
  @Can(Permissions.Create)
  @ApiCreatedResponse({ type: Publication })
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

  @Patch(':id')
  @Can(Permissions.Update)
  @ApiOkResponse({ type: UpdateSuccessResponse })
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(updatePublicationSchema))
    updatePublicationDto: UpdatePublicationDto,
  ) {
    const [updateds] = await this.publicationService.update(
      +id,
      updatePublicationDto,
    );
    return {
      updateds,
      message: 'Item atualizado com sucesso',
    };
  }

  @Delete(':id')
  @Can(Permissions.Delete)
  @ApiOkResponse({ type: DeleteSuccessResponse })
  public async destroy(@Param('id') id: string) {
    const deleteds = await this.publicationService.remove(+id);
    return {
      status: 'success',
      message: 'Student deleted successfully',
      deleteds,
    };
  }
}
