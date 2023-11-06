import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import PlanoConta from 'App/Models/PlanoConta'
import Usuario from 'App/Models/Usuario'
import { PlanoContaFactory } from 'Database/factories/PlanoContaFactory'

test.group('Plano Conta', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar plano conta', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const planoConta = await PlanoContaFactory.make()
    const response = await client.post('api/v1/planoconta').form(planoConta).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar plano conta', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const planoContaAntigo = await PlanoConta.query().firstOrFail()
    const planoConta = await PlanoContaFactory.make()
    const response = await client.put(`api/v1/planoconta/${planoContaAntigo.id}`).form(planoConta).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar plano conta inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const planoConta = await PlanoContaFactory.make()
    const response = await client.put(`api/v1/planoconta/45455`).form(planoConta).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar plano conta', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const planoContaAntigo = await PlanoConta.query().firstOrFail()
    const response = await client.patch(`api/v1/planoconta/${planoContaAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os planos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/planoconta').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os planos ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/planoconta/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar plano conta por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/planoconta/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar plano conta por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/planoconta/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
