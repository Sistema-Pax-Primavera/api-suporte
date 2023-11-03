import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import CategoriaHistorico from 'App/Models/CategoriaHistorico'
import Usuario from 'App/Models/Usuario'
import { CategoriaHistoricoFactory } from 'Database/factories/CategoriaHistoricoFactory'

test.group('Categoria Histórico', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar categoria', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const categoriaHistorico = await CategoriaHistoricoFactory.make()
    const response = await client.post('api/v1/categoriahistorico').form(categoriaHistorico).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar categoria', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const categoriaHistoricoAntigo = await CategoriaHistorico.query().firstOrFail()
    const categoriaHistorico = await CategoriaHistoricoFactory.make()
    const response = await client.put(`api/v1/categoriahistorico/${categoriaHistoricoAntigo.id}`).form(categoriaHistorico).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar categoria inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const categoriaHistorico = await CategoriaHistoricoFactory.make()
    const response = await client.put(`api/v1/categoriahistorico/45455`).form(categoriaHistorico).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar categoria', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const categoriaHistoricoAntigo = await CategoriaHistorico.query().firstOrFail()
    const response = await client.patch(`api/v1/categoriahistorico/${categoriaHistoricoAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as categorias', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/categoriahistorico').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as categorias ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/categoriahistorico/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar categoria por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/categoriahistorico/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar categoria por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/categoriahistorico/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
