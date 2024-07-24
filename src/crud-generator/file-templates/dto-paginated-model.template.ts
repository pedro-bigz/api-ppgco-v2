import { TemplateCompiler } from './base.template';

export const getCompiler = (props: object) => {
  return TemplateCompiler.create()
    .setContent(
      `import { PaginatedResponse } from 'src/core';
import { <%= modelClassName %> } from '../entities';
import { ApiProperty } from '@nestjs/swagger';

export class Paginated<%= modelClassName %>Dto extends PaginatedResponse<<%= modelClassName %>> {
  @ApiProperty({ type: [<%= modelClassName %>] })
  data: <%= modelClassName %>[];
}
`,
    )
    .setProps(props)
    .compile();
};
