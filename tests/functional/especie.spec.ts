import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Especie from 'App/Models/Especie'
import Usuario from 'App/Models/Usuario'
import { EspecieFactory } from 'Database/factories/EspecieFactory'

test.group('Espécie', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar espécie', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const especie = await EspecieFactory.make()
    const response = await client.post('api/v1/especie').form(especie).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar espécie', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const especieAntigo = await Especie.query().firstOrFail()
    const especie = await EspecieFactory.make()
    const response = await client.put(`api/v1/especie/${especieAntigo.id}`).form(especie).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar especie inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const especie = await EspecieFactory.make()
    const response = await client.put(`api/v1/especie/45455`).form(especie).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar espécie', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const especieAntigo = await Especie.query().firstOrFail()
    const response = await client.patch(`api/v1/especie/${especieAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as espécies', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/especie').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as espécies ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/especie/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar espécie por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/especie/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar espécie por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/especie/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
