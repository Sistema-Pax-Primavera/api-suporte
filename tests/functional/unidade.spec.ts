import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Unidade from 'App/Models/Unidade'
import Usuario from 'App/Models/Usuario'
import { UnidadeFactory } from 'Database/factories/UnidadeFactory'

test.group('Unidade', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar unidade', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const unidade = await UnidadeFactory.make()
    const response = await client.post('api/v1/unidade').form(unidade).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar unidade', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const unidadeAntigo = await Unidade.query().firstOrFail()
    const unidade = await UnidadeFactory.make()
    const response = await client.put(`api/v1/unidade/${unidadeAntigo.id}`).form(unidade).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar unidade inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const unidade = await UnidadeFactory.make()
    const response = await client.put(`api/v1/unidade/45455`).form(unidade).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar unidade', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const unidadeAntigo = await Unidade.query().firstOrFail()
    const response = await client.patch(`api/v1/unidade/${unidadeAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os unidades', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/unidade').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os unidades ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/unidade/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar unidade por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/unidade/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar unidade por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/unidade/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
