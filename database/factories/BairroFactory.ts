import Factory from '@ioc:Adonis/Lucid/Factory'
import Bairro from 'App/Models/Bairro'

export const BairroFactory = Factory.define(Bairro, ({ faker }) => {
  return {
    municipioId: 1, 
    regiaoBairroId: null,
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
