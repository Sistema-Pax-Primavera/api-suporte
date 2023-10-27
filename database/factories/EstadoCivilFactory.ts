import Factory from '@ioc:Adonis/Lucid/Factory'
import EstadoCivil from 'App/Models/EstadoCivil'

export const EstadoCivilFactory = Factory.define(EstadoCivil, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    ativo: true,
    created_by: 'System',
  }
}).build()
