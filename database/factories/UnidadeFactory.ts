import Factory from '@ioc:Adonis/Lucid/Factory'
import Unidade from 'App/Models/Unidade'

export const UnidadeFactory = Factory
  .define(Unidade, ({ faker }) => {
    return {
      descricao: faker.company.name(),
      razao_social: faker.company.name(),
      cnpj: faker.number.bigInt({ min: 10000000000000, max: 99999999999999 }).toString(),
      telefone: faker.phone.number(),
      email: faker.internet.email(),
      cep: faker.location.zipCode('########'),
      uf: faker.location.countryCode(),
      municipio: faker.location.city(),
      bairro: faker.location.county(),
      rua: faker.location.street(),
      numero: faker.number.bigInt({ min: 1, max: 100 }).toString(),
      complemento: faker.datatype.boolean() ? faker.location.secondaryAddress() : null,
      inscricao_estadual: faker.datatype.boolean() ? faker.number.bigInt({ min: 100000000, max: 999999999 }).toString() : null,
      inscricao_municipal: faker.datatype.boolean() ? faker.number.bigInt({ min: 100000000, max: 999999999 }).toString() : null,
      ativo: true,
      created_by: 'System',
    }
  })
  .build()
