import { TemplateCompiler } from './base.template';

export const getCompiler = (props: object) => {
  return TemplateCompiler.create()
    .setContent(
      `
import {
  Body,
  Query,
  Param,
} from '@nestjs/common';
import {
  OrderDto,
  ZodValidationPipe,
  SwaggerSafeController,
  SwaggerSafeGet,
  SwaggerSafePost,
  SwaggerSafePatch,
  SwaggerSafeDelete,
} from 'src/common';
import { <%= service.className %> } from './<%= service.path %>';
import {
  <%= dto.create.type %>,
  <%= dto.update.type %>,
  <%= schema.create %>,
  <%= schema.update %>,
} from './dto';
import { <%= modelClassName %> } from './entities';

@SwaggerSafeController('<%= routePreffix %>')
export class <%= controllerClassName %> {
  public constructor(private readonly <%= service.name %>: <%= service.className %>) {}

  @SwaggerSafeGet({ type: <%= modelClassName %> })
  public findAll(
    @Query('page') page: string,
    @Query('perPage') perPage: string,
    @Query('search') search: string,
    @Query('searchIn') searchIn: string,
    @Query('orderBy') order: OrderDto[],
  ) {
    return this.<%= service.name %>.find(+page, +perPage, search, searchIn, order);
  }

  @SwaggerSafeGet({ path: ':id', type: <%= modelClassName %> })
  public findOne(@Param('id') id: string) {
    return this.<%= service.name %>.findOne(+id);
  }

  @SwaggerSafePost({ type: <%= modelClassName %> })
  public create(
    @Body(new ZodValidationPipe(<%= schema.create %>))
    <%= dto.create.name %>: <%= dto.create.type %>,
  ) {
    return this.<%= service.name %>.create(<%= dto.create.name %>);
  }

  @SwaggerSafePatch({ path: ':id' })
  public async update(
    @Param('id') id: string,
    @Body(new ZodValidationPipe(<%= schema.update %>))
    <%= dto.update.name %>: <%= dto.update.type %>,
  ) {
    const [updateds] = await this.<%= service.name %>.update(+id, <%= dto.update.name %>);
    return {
      updateds,
      message: 'Item atualizado com sucesso',
    }
  }

  @SwaggerSafeDelete({ path: ':id' })
  public async destroy(@Param('id') id: string) {
    const deleteds = await this.<%= service.name %>.remove(+id);
    return {
      deleteds,
      message: 'Item deletado com sucesso',
    }
  }
}`,
    )
    .setProps(props)
    .compile();
};
