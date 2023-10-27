import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Rota from 'App/Models/Rota'
import Usuario from 'App/Models/Usuario'
import { RotaFactory } from 'Database/factories/RotaFactory'

test.group('Rota', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar rota', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const rota = await RotaFactory.make()
    const response = await client.post('api/v1/rota').form(rota).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar rota', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const rotaAntigo = await Rota.query().firstOrFail()
    const rota = await RotaFactory.make()
    const response = await client.put(`api/v1/rota/${rotaAntigo.id}`).form(rota).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar rota inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const rota = await RotaFactory.make()
    const response = await client.put(`api/v1/rota/45455`).form(rota).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar rota', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const rotaAntigo = await Rota.query().firstOrFail()
    const response = await client.patch(`api/v1/rota/${rotaAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as rotas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/rota').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as rotas ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/rota/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar rota por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/rota/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar rota por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/rota/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
