import Factory from '@ioc:Adonis/Lucid/Factory'
import FormaPagamento from 'App/Models/FormaPagamento'

export const FormaPagamentoFactory = Factory.define(FormaPagamento, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    tipo: 'T',
    ativo: true,
    created_by: 'System',
  }
}).build()
