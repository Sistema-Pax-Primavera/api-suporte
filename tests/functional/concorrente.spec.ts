import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Concorrente from 'App/Models/Concorrente'
import Usuario from 'App/Models/Usuario'
import { ConcorrenteFactory } from 'Database/factories/ConcorrenteFactory'

test.group('Concorrente', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar concorrente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const concorrente = await ConcorrenteFactory.make()
    const response = await client.post('api/v1/concorrente').form(concorrente).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar concorrente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const concorrenteAntigo = await Concorrente.query().firstOrFail()
    const concorrente = await ConcorrenteFactory.make()
    const response = await client.put(`api/v1/concorrente/${concorrenteAntigo.id}`).form(concorrente).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar concorrente inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const concorrente = await ConcorrenteFactory.make()
    const response = await client.put(`api/v1/concorrente/45455`).form(concorrente).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar concorrente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const concorrenteAntigo = await Concorrente.query().firstOrFail()
    const response = await client.patch(`api/v1/concorrente/${concorrenteAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as concorrentes', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/concorrente').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as concorrentes ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/concorrente/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar concorrente por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/concorrente/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar concorrente por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/concorrente/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
