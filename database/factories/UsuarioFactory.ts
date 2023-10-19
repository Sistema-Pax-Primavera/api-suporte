import Factory from '@ioc:Adonis/Lucid/Factory';
import Usuario from 'App/Models/Usuario';

export const UsuarioFactory = Factory.define(Usuario, ({ faker }) => {
  return {
    unidade_id: 1,
    setor_id: 1,
    funcao_id: 1,
    nome: faker.person.fullName(),
    cpf: faker.number.bigInt({ min: 10000000000, max: 99999999999 }).toString(),
    senha: '1234',
    porcentagem_desconto: faker.number.bigInt({ min: 0, max: 100 }),
    ativo: true,
    created_by: 'System',
  };
}).build();
