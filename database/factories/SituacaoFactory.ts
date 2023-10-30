import Factory from '@ioc:Adonis/Lucid/Factory'
import Situacao from 'App/Models/Situacao'

export const SituacaoFactory = Factory.define(Situacao, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
