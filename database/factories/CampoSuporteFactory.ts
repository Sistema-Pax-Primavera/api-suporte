import Factory from '@ioc:Adonis/Lucid/Factory'
import CampoSuporte from 'App/Models/CampoSuporte'

export const CampoSuporteFactory = Factory.define(CampoSuporte, ({ faker }) => {
  return {
    categoriaId: 1,
    descricao: faker.lorem.word(2),
    tipo: 'string',
    opcoes: [
      {
        id: 1,
        value: faker.lorem.word(3)
      }
    ],
    ativo: true,
    created_by: 'System',
  }
}).build()
