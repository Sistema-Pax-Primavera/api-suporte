import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import FormaPagamento from 'App/Models/FormaPagamento'
import Usuario from 'App/Models/Usuario'
import { FormaPagamentoFactory } from 'Database/factories/FormaPagamentoFactory'

test.group('Forma Pagamento', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar forma', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const formaPagamento = await FormaPagamentoFactory.make()
    const response = await client.post('api/v1/formapagamento').form(formaPagamento).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar forma', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const formaPagamentoAntigo = await FormaPagamento.query().firstOrFail()
    const formaPagamento = await FormaPagamentoFactory.make()
    const response = await client.put(`api/v1/formapagamento/${formaPagamentoAntigo.id}`).form(formaPagamento).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar forma inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const formaPagamento = await FormaPagamentoFactory.make()
    const response = await client.put(`api/v1/formapagamento/45455`).form(formaPagamento).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar forma', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const formaPagamentoAntigo = await FormaPagamento.query().firstOrFail()
    const response = await client.patch(`api/v1/formapagamento/${formaPagamentoAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as formas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/formapagamento').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as formas ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/formapagamento/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar forma por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/formapagamento/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar forma por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/formapagamento/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
