import Factory from '@ioc:Adonis/Lucid/Factory'
import Item from 'App/Models/Item'

export const ItemFactory = Factory.define(Item, ({ faker }) => {
  return {
    categoriaItemId: 1,
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
