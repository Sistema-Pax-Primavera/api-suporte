import Factory from '@ioc:Adonis/Lucid/Factory'
import Funcao from 'App/Models/Funcao'

export const FuncaoFactory = Factory.define(Funcao, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
