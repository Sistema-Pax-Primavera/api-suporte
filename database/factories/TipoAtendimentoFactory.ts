import Factory from '@ioc:Adonis/Lucid/Factory'
import TipoAtendimento from 'App/Models/TipoAtendimento'

export const TipoAtendimentoFactory = Factory.define(TipoAtendimento, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
