import Factory from '@ioc:Adonis/Lucid/Factory'
import CategoriaHistorico from 'App/Models/CategoriaHistorico'

export const CategoriaHistoricoFactory = Factory.define(CategoriaHistorico, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
