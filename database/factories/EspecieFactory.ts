import Factory from '@ioc:Adonis/Lucid/Factory'
import Especie from 'App/Models/Especie'

export const EspecieFactory = Factory.define(Especie, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
