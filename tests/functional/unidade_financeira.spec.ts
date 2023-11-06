import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import UnidadeFinanceira from 'App/Models/UnidadeFinanceira'
import Usuario from 'App/Models/Usuario'
import { UnidadeFinanceiraFactory } from 'Database/factories/UnidadeFinanceiraFactory'

test.group('UnidadeFinanceira Financeira', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar unidade', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const unidade = await UnidadeFinanceiraFactory.make()
    const response = await client.post('api/v1/unidadefinanceira').form(unidade).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar unidade', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const unidadeAntigo = await UnidadeFinanceira.query().firstOrFail()
    const unidade = await UnidadeFinanceiraFactory.make()
    const response = await client.put(`api/v1/unidadefinanceira/${unidadeAntigo.id}`).form(unidade).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar unidade inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const unidade = await UnidadeFinanceiraFactory.make()
    const response = await client.put(`api/v1/unidadefinanceira/45455`).form(unidade).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar unidade', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const unidadeAntigo = await UnidadeFinanceira.query().firstOrFail()
    const response = await client.patch(`api/v1/unidadefinanceira/${unidadeAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos as unidades', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/unidadefinanceira').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos as unidades ativas', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/unidadefinanceira/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar unidade por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/unidadefinanceira/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar unidade por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/unidadefinanceira/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
