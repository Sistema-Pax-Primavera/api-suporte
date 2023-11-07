import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Template from 'App/Models/Template'
import Usuario from 'App/Models/Usuario'
import { TemplateFactory } from 'Database/factories/TemplateFactory'

test.group('Template', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar template', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const template = await TemplateFactory.make()
    const response = await client.post('api/v1/template').form(template).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar template', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const templateAntigo = await Template.query().firstOrFail()
    const template = await TemplateFactory.make()
    const response = await client.put(`api/v1/template/${templateAntigo.id}`).form(template).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar template inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const template = await TemplateFactory.make()
    const response = await client.put(`api/v1/template/45455`).form(template).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar template', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const templateAntigo = await Template.query().firstOrFail()
    const response = await client.patch(`api/v1/template/${templateAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os templates', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/template').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os templates ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/template/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar template por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/template/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar template por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/template/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
