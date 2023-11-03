import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Raca from 'App/Models/Raca'
import Usuario from 'App/Models/Usuario'
import { RacaFactory } from 'Database/factories/RacaFactory'

test.group('Raça', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar raça', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const raca = await RacaFactory.make()
    const response = await client.post('api/v1/raca').form(raca).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar raça', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const racaAntigo = await Raca.query().firstOrFail()
    const raca = await RacaFactory.make()
    const response = await client.put(`api/v1/raca/${racaAntigo.id}`).form(raca).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar raca inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const raca = await RacaFactory.make()
    const response = await client.put(`api/v1/raca/45455`).form(raca).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar raça', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const racaAntigo = await Raca.query().firstOrFail()
    const response = await client.patch(`api/v1/raca/${racaAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as raças', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/raca').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as raças ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/raca/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar raça por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/raca/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar raça por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/raca/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
