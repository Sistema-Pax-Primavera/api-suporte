import Factory from '@ioc:Adonis/Lucid/Factory'
import PlanoConta from 'App/Models/PlanoConta'

export const PlanoContaFactory = Factory.define(PlanoConta, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    codigo: faker.number.int().toString(),
    tipo: 1,
    nivel: 1,
    visivel: faker.datatype.boolean(),
    ativo: true,
    created_by: 'System',
  }
}).build()
