import Usuario from '#app/Models/Usuario'
import Factory from '@adonisjs/lucid/factories'

export default Factory.define(Usuario, ({ faker }) => {
  return {
    nome: faker.person.fullName(),
    cpf: '34048756052',
    senha: '1234',
    createdBy: 'System'
  }
}).build()
