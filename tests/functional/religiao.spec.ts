import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Religiao from 'App/Models/Religiao'
import Usuario from 'App/Models/Usuario'
import { ReligiaoFactory } from 'Database/factories/ReligiaoFactory'

test.group('Religião', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar religião', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const religiao = await ReligiaoFactory.make()
    const response = await client.post('api/v1/religiao').form(religiao).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar religião', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const religiaoAntigo = await Religiao.query().firstOrFail()
    const religiao = await ReligiaoFactory.make()
    const response = await client.put(`api/v1/religiao/${religiaoAntigo.id}`).form(religiao).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar religião inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const religiao = await ReligiaoFactory.make()
    const response = await client.put(`api/v1/religiao/45455`).form(religiao).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar religião', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const religiaoAntigo = await Religiao.query().firstOrFail()
    const response = await client.patch(`api/v1/religiao/${religiaoAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as religiões', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/religiao').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as religiões ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/religiao/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar religião por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/religiao/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar religião por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/religiao/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
