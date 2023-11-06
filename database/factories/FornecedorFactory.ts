import Factory from '@ioc:Adonis/Lucid/Factory'
import Fornecedor from 'App/Models/Fornecedor'

export const FornecedorFactory = Factory.define(Fornecedor, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
