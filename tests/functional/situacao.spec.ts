import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Situacao from 'App/Models/Situacao'
import Usuario from 'App/Models/Usuario'
import { SituacaoFactory } from 'Database/factories/SituacaoFactory'

test.group('Situação', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar situação', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const situacao = await SituacaoFactory.make()
    const response = await client.post('api/v1/situacao').form(situacao).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar situação', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const situacaoAntigo = await Situacao.query().firstOrFail()
    const situacao = await SituacaoFactory.make()
    const response = await client.put(`api/v1/situacao/${situacaoAntigo.id}`).form(situacao).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar situação inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const situacao = await SituacaoFactory.make()
    const response = await client.put(`api/v1/situacao/45455`).form(situacao).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar situação', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const situacaoAntigo = await Situacao.query().firstOrFail()
    const response = await client.patch(`api/v1/situacao/${situacaoAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as situações', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/situacao').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as situações ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/situacao/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar situação por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/situacao/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar situação por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/situacao/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
