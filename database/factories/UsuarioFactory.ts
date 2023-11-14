import Factory from '@ioc:Adonis/Lucid/Factory';
import Usuario from 'App/Models/Usuario';

export const UsuarioFactory = Factory.define(Usuario, ({ faker }) => {
  return {
    unidade_id: 1,
    setor_id: 1,
    funcao_id: 1,
    nome: faker.person.fullName(),
    cpf: '214.012.540-12',
    password: '1234',
    porcentagem_desconto: faker.number.int({ min: 0, max: 100 }),
    ativo: true,
    created_by: 'System',
  };
}).build();
