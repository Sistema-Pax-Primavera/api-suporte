import Usuario from 'App/Models/Usuario'
import Factory from '@ioc:Adonis/Lucid/Factory'

export default Factory.define(Usuario, ({ faker }) => {
  return {
    nome: faker.person.fullName(),
    cpf: '34048756052',
    senha: '1234',
    createdBy: 'System'
  }
}).build()
