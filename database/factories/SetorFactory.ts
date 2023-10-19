import Factory from '@ioc:Adonis/Lucid/Factory'
import Setor from 'App/Models/Setor'

export const SetorFactory = Factory.define(Setor, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
