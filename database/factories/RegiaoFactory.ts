import Factory from '@ioc:Adonis/Lucid/Factory'
import Regiao from 'App/Models/Regiao'

export const RegiaoFactory = Factory.define(Regiao, ({ faker }) => {
  return {
    unidadeId: 1,
    cobradorId: 1,
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
