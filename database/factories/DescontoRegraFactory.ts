import Factory from '@ioc:Adonis/Lucid/Factory'
import DescontoRegra from 'App/Models/DescontoRegra'

export const DescontoRegraFactory = Factory.define(DescontoRegra, ({ faker }) => {
  return {
    tipo: faker.number.int({
      min: 1,
      max: 2
    }),
    quantidade: faker.number.int({
      min:1,
      max: 12
    }),
    operador: '=',
    desconto: faker.number.float(),
    ativo: true,
    created_by: 'System',
  }
}).build()
