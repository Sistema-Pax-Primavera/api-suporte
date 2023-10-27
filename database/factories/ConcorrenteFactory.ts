import Factory from '@ioc:Adonis/Lucid/Factory'
import Concorrente from 'App/Models/Concorrente'

export const ConcorrenteFactory = Factory
  .define(Concorrente, ({ faker }) => {
    return {
      descricao: faker.company.name(),
      ativo: true,
      created_by: 'System',
    }
  })
  .build()
