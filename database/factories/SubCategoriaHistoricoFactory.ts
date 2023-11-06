import Factory from '@ioc:Adonis/Lucid/Factory'
import SubCategoriaHistorico from 'App/Models/SubCategoriaHistorico'

export const SubCategoriaHistoricoFactory = Factory.define(SubCategoriaHistorico, ({ faker }) => {
  return {
    categoriaHistoricoId: 1,
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
