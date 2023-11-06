import Factory from '@ioc:Adonis/Lucid/Factory'
import Banco from 'App/Models/Banco'

export const BancoFactory = Factory.define(Banco, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
