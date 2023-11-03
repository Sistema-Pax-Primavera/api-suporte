import Factory from '@ioc:Adonis/Lucid/Factory'
import SubTipoAtendimento from 'App/Models/SubTipoAtendimento'

export const SubTipoAtendimentoFactory = Factory.define(SubTipoAtendimento, ({ faker }) => {
  return {
    tipoAtendimentoId: 1,
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
