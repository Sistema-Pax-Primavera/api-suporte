import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Item from 'App/Models/Item'
import Usuario from 'App/Models/Usuario'
import { ItemFactory } from 'Database/factories/ItemFactory'

test.group('Item', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar item', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const item = await ItemFactory.make()
    const response = await client.post('api/v1/item').form(item).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar item', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const itemAntigo = await Item.query().firstOrFail()
    const item = await ItemFactory.make()
    const response = await client.put(`api/v1/item/${itemAntigo.id}`).form(item).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar item inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const item = await ItemFactory.make()
    const response = await client.put(`api/v1/item/45455`).form(item).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar item', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const itemAntigo = await Item.query().firstOrFail()
    const response = await client.patch(`api/v1/item/${itemAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os itens', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/item').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os itens ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/item/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar item por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/item/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar item por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/item/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
