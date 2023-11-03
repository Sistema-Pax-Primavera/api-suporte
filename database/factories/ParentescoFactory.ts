import Factory from '@ioc:Adonis/Lucid/Factory'
import Parentesco from 'App/Models/Parentesco'

export const ParentescoFactory = Factory.define(Parentesco, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
