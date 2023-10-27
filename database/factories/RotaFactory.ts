import Factory from '@ioc:Adonis/Lucid/Factory'
import Rota from 'App/Models/Rota'

export const RotaFactory = Factory.define(Rota, ({ faker }) => {
  return {
    unidadeId: 1, 
    cobradorId: 1,
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
