import Factory from '@ioc:Adonis/Lucid/Factory'
import UnidadeFinanceira from 'App/Models/UnidadeFinanceira'

export const UnidadeFinanceiraFactory = Factory
  .define(UnidadeFinanceira, ({ faker }) => {
    return {
      descricao: faker.company.name(),
      ativo: true,
      created_by: 'System',
    }
  })
  .build()
