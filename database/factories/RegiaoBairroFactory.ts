import Factory from '@ioc:Adonis/Lucid/Factory'
import RegiaoBairro from 'App/Models/RegiaoBairro'

export const RegiaoBairroFactory = Factory.define(RegiaoBairro, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
