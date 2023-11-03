import Factory from '@ioc:Adonis/Lucid/Factory'
import Raca from 'App/Models/Raca'

export const RacaFactory = Factory
  .define(Raca, ({ faker }) => {
    return {
      especieId: 1,
      descricao: faker.company.name(),
      ativo: true,
      created_by: 'System',
    }
  })
  .build()
