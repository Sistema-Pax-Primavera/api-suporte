import Factory from '@ioc:Adonis/Lucid/Factory'
import Adicional from 'App/Models/Adicional'

export const AdicionalFactory = Factory.define(Adicional, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    pet: faker.datatype.boolean(),
    porte: 'GG',
    resgate: faker.datatype.boolean(),
    ativo: true,
    created_by: 'System',
  }
}).build()
