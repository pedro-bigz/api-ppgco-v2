import { TemplateCompiler } from './base.template';

export const getCompiler = (props: object) => {
  return TemplateCompiler.create()
    .setContent(
      `
import { z } from 'zod';
import { customCreateZodDto } from 'src/common';
<%= setImportString(imports) %>

export const <%= schemaName %> = z.object({
<% _.each(attributes, function(attribute, index) {  %>  <%= attribute.name %>: <%= attribute.validation %>,
<% }) %>});

export class <%= dtoName %>  extends customCreateZodDto(
  <%= schemaName %>,
) {}
`,
    )
    .setProps(props)
    .compile();
};
