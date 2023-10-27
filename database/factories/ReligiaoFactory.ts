import Factory from '@ioc:Adonis/Lucid/Factory'
import Religiao from 'App/Models/Religiao'

export const ReligiaoFactory = Factory.define(Religiao, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
