import { TemplateCompiler } from './base.template';

export const getCompiler = (props: object) => {
  return TemplateCompiler.create()
    .setContent(
      `
import { z } from 'zod';
<%= setImportString(imports) %>

export const <%= schemaName %> = z.object({
<% _.each(attributes, function(attribute, index) {  %>  <%= attribute.name %>: <%= attribute.validation %>,
<% }) %>});

export type <%= dtoName %> = Partial<z.infer<typeof <%= schemaName %>>>;`,
    )
    .setProps(props)
    .compile();
};
