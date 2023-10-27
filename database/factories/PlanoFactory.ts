import Factory from '@ioc:Adonis/Lucid/Factory'
import Plano from 'App/Models/Plano'

export const PlanoFactory = Factory.define(Plano, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
