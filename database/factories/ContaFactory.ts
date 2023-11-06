import Factory from '@ioc:Adonis/Lucid/Factory'
import Conta from 'App/Models/Conta'

export const ContaFactory = Factory
  .define(Conta, ({ faker }) => {
    return {
      unidadeId: 1, 
      bancoId: null,
      descricao: faker.company.name(),
      tipo: 'T',
      ativo: true,
      created_by: 'System',
    }
  })
  .build()
