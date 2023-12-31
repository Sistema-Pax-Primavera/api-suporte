import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Funcao from 'App/Models/Funcao'
import Usuario from 'App/Models/Usuario'
import { FuncaoFactory } from 'Database/factories/FuncaoFactory'

test.group('Função', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar função', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const funcao = await FuncaoFactory.make()

    const funcaoModulo = {
      ...funcao,
      modulos: [
        {
          moduloId: 1,
          acao: ['LER', 'GRAVAR']
        }
      ]
    }

    const response = await client.post('api/v1/funcao').form(funcaoModulo).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar função', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const funcaoAntigo = await Funcao.query().firstOrFail()
    const funcao = await FuncaoFactory.make()

    const funcaoModulo = {
      ...funcao,
      modulos: [
        {
          moduloId: 1,
          acao: ['LER', 'GRAVAR']
        }
      ]
    }

    const response = await client.put(`api/v1/funcao/${funcaoAntigo.id}`).form(funcaoModulo).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar função inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const funcao = await FuncaoFactory.make()
    const response = await client.put(`api/v1/funcao/45455`).form(funcao).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar função', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const funcaoAntigo = await Funcao.query().firstOrFail()
    const response = await client.patch(`api/v1/funcao/${funcaoAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as funções', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/funcao').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as funções ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/funcao/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar função por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/funcao/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar função por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/funcao/1231498').loginAs(usuario)
    response.assertStatus(404)
  });

  test('Buscar funções por descricao', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const funcao = await Funcao.query().firstOrFail()
    const response = await client.get(`api/v1/funcao/descricao/${funcao.descricao}`).loginAs(usuario)
    response.assertStatus(200)
  });
})
