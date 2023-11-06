import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import CategoriaItem from 'App/Models/CategoriaItem'
import Usuario from 'App/Models/Usuario'
import { CategoriaItemFactory } from 'Database/factories/CategoriaItemFactory'

test.group('Categoria Item', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar categoria', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const categoriaItem = await CategoriaItemFactory.make()
    const response = await client.post('api/v1/categoriaitem').form(categoriaItem).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar categoria', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const categoriaItemAntigo = await CategoriaItem.query().firstOrFail()
    const categoriaItem = await CategoriaItemFactory.make()
    const response = await client.put(`api/v1/categoriaitem/${categoriaItemAntigo.id}`).form(categoriaItem).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar categoria inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const categoriaItem = await CategoriaItemFactory.make()
    const response = await client.put(`api/v1/categoriaitem/45455`).form(categoriaItem).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar categoria', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const categoriaItemAntigo = await CategoriaItem.query().firstOrFail()
    const response = await client.patch(`api/v1/categoriaitem/${categoriaItemAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as categorias', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/categoriaitem').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as categorias ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/categoriaitem/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar categoria por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/categoriaitem/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar categoria por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/categoriaitem/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
