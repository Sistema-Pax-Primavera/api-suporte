import Template from 'App/Models/Template'
import Factory from '@ioc:Adonis/Lucid/Factory'

export const TemplateFactory = Factory.define(Template, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    template: '<HTML><HEAD></HEAD><BODY></BODY></HTML>',
    tipo: 1,
    ativo: true,
    created_by: 'System',
  }
}).build()
