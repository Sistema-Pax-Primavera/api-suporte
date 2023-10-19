import Factory from '@ioc:Adonis/Lucid/Factory'
import Modulo from 'App/Models/Modulo'

export const ModuloFactory = Factory.define(Modulo, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
