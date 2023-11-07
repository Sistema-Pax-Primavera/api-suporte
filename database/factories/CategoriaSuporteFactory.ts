import Factory from '@ioc:Adonis/Lucid/Factory'
import CategoriaSuporte from 'App/Models/CategoriaSuporte'

export const CategoriaSuporteFactory = Factory.define(CategoriaSuporte, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    prioridade: 1,
    setor: [1],
    ativo: true,
    created_by: 'System',
  }
}).build()
