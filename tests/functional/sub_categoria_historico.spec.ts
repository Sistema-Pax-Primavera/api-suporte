import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import SubCategoriaHistorico from 'App/Models/SubCategoriaHistorico'
import Usuario from 'App/Models/Usuario'
import { SubCategoriaHistoricoFactory } from 'Database/factories/SubCategoriaHistoricoFactory'

test.group('Sub Categoria Histórico', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar sub categoria', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const subSubCategoriaHistorico = await SubCategoriaHistoricoFactory.make()
    const response = await client.post('api/v1/subcategoriahistorico').form(subSubCategoriaHistorico).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar sub categoria', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const subSubCategoriaHistoricoAntigo = await SubCategoriaHistorico.query().firstOrFail()
    const subSubCategoriaHistorico = await SubCategoriaHistoricoFactory.make()
    const response = await client.put(`api/v1/subcategoriahistorico/${subSubCategoriaHistoricoAntigo.id}`).form(subSubCategoriaHistorico).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar sub categoria inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const subSubCategoriaHistorico = await SubCategoriaHistoricoFactory.make()
    const response = await client.put(`api/v1/subcategoriahistorico/45455`).form(subSubCategoriaHistorico).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar sub categoria', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const subSubCategoriaHistoricoAntigo = await SubCategoriaHistorico.query().firstOrFail()
    const response = await client.patch(`api/v1/subcategoriahistorico/${subSubCategoriaHistoricoAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as sub categorias', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/subcategoriahistorico').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as sub categorias ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/subcategoriahistorico/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar sub categoria por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/subcategoriahistorico/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar sub categoria por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/subcategoriahistorico/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
