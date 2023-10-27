import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Plano from 'App/Models/Plano'
import Usuario from 'App/Models/Usuario'
import { PlanoFactory } from 'Database/factories/PlanoFactory'

test.group('Plano', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar plano', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const plano = await PlanoFactory.make()
    const response = await client.post('api/v1/plano').form(plano).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar plano', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const planoAntigo = await Plano.query().firstOrFail()
    const plano = await PlanoFactory.make()
    const response = await client.put(`api/v1/plano/${planoAntigo.id}`).form(plano).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar plano inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const plano = await PlanoFactory.make()
    const response = await client.put(`api/v1/plano/45455`).form(plano).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar plano', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const planoAntigo = await Plano.query().firstOrFail()
    const response = await client.patch(`api/v1/plano/${planoAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os planos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/plano').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os planos ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/plano/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar plano por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/plano/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar plano por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/plano/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
