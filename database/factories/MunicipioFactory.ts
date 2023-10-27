import Factory from '@ioc:Adonis/Lucid/Factory'
import Municipio from 'App/Models/Municipio'

export const MunicipioFactory = Factory.define(Municipio, ({ faker }) => {
  return {
    descricao: faker.lorem.words(2),
    uf: faker.location.countryCode(),
    ativo: true,
    created_by: 'System',
  }
}).build()
