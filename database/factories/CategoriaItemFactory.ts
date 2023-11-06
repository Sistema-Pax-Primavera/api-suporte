import Factory from '@ioc:Adonis/Lucid/Factory'
import CategoriaItem from 'App/Models/CategoriaItem'

export const CategoriaItemFactory = Factory.define(CategoriaItem, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
