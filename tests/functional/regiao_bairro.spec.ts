import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import RegiaoBairro from 'App/Models/RegiaoBairro'
import Usuario from 'App/Models/Usuario'
import { RegiaoBairroFactory } from 'Database/factories/RegiaoBairroFactory'

test.group('Região Bairro', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar região', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const regiao = await RegiaoBairroFactory.make()
    const response = await client.post('api/v1/regiaobairro').form(regiao).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar região', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const regiaoAntigo = await RegiaoBairro.query().firstOrFail()
    const regiao = await RegiaoBairroFactory.make()
    const response = await client.put(`api/v1/regiaobairro/${regiaoAntigo.id}`).form(regiao).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar região inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const regiao = await RegiaoBairroFactory.make()
    const response = await client.put(`api/v1/regiaobairro/45455`).form(regiao).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar região', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const regiaoAntigo = await RegiaoBairro.query().firstOrFail()
    const response = await client.patch(`api/v1/regiaobairro/${regiaoAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as regiões', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/regiaobairro').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as regiões ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/regiaobairro/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar região por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/regiaobairro/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar região por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/regiaobairro/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
