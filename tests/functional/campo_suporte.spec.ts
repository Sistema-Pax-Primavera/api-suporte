import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import CampoSuporte from 'App/Models/CampoSuporte'
import Usuario from 'App/Models/Usuario'
import { CampoSuporteFactory } from 'Database/factories/CampoSuporteFactory'

test.group('Campo Suporte', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar campo', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const campoSuporte = await CampoSuporteFactory.make()
    const response = await client.post('api/v1/camposuporte').form(campoSuporte).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar campo', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const campoSuporteAntigo = await CampoSuporte.query().firstOrFail()
    const campoSuporte = await CampoSuporteFactory.make()
    const response = await client.put(`api/v1/camposuporte/${campoSuporteAntigo.id}`).form(campoSuporte).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar campo inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const campoSuporte = await CampoSuporteFactory.make()
    const response = await client.put(`api/v1/camposuporte/45455`).form(campoSuporte).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar campo', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const campoSuporteAntigo = await CampoSuporte.query().firstOrFail()
    const response = await client.patch(`api/v1/camposuporte/${campoSuporteAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os campos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/camposuporte').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os campos ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/camposuporte/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar campo por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/camposuporte/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar campo por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/camposuporte/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
