import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import CategoriaSuporte from 'App/Models/CategoriaSuporte'
import Usuario from 'App/Models/Usuario'
import { CategoriaSuporteFactory } from 'Database/factories/CategoriaSuporteFactory'

test.group('Categoria Suporte', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar categoria', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const categoriaSuporte = await CategoriaSuporteFactory.make()
    const response = await client.post('api/v1/categoriasuporte').form(categoriaSuporte).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar categoria', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const categoriaSuporteAntigo = await CategoriaSuporte.query().firstOrFail()
    const categoriaSuporte = await CategoriaSuporteFactory.make()
    const response = await client.put(`api/v1/categoriasuporte/${categoriaSuporteAntigo.id}`).form(categoriaSuporte).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar categoria inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const categoriaSuporte = await CategoriaSuporteFactory.make()
    const response = await client.put(`api/v1/categoriasuporte/45455`).form(categoriaSuporte).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar categoria', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const categoriaSuporteAntigo = await CategoriaSuporte.query().firstOrFail()
    const response = await client.patch(`api/v1/categoriasuporte/${categoriaSuporteAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as categorias', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/categoriasuporte').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as categorias ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/categoriasuporte/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar categoria por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/categoriasuporte/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar categoria por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/categoriasuporte/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
