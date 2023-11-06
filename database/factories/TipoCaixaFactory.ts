import Factory from '@ioc:Adonis/Lucid/Factory'
import TipoCaixa from 'App/Models/TipoCaixa'

export const TipoCaixaFactory = Factory.define(TipoCaixa, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
