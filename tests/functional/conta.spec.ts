import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Conta from 'App/Models/Conta'
import Usuario from 'App/Models/Usuario'
import { ContaFactory } from 'Database/factories/ContaFactory'

test.group('Conta', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar conta', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const conta = await ContaFactory.make()
    const response = await client.post('api/v1/conta').form(conta).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar conta', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const contaAntigo = await Conta.query().firstOrFail()
    const conta = await ContaFactory.make()
    const response = await client.put(`api/v1/conta/${contaAntigo.id}`).form(conta).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar conta inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const conta = await ContaFactory.make()
    const response = await client.put(`api/v1/conta/45455`).form(conta).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar conta', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const contaAntigo = await Conta.query().firstOrFail()
    const response = await client.patch(`api/v1/conta/${contaAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as contas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/conta').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as contas ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/conta/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar conta por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/conta/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar conta por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/conta/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
