import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import TipoCaixa from 'App/Models/TipoCaixa'
import Usuario from 'App/Models/Usuario'
import { TipoCaixaFactory } from 'Database/factories/TipoCaixaFactory'

test.group('Tipo Caixa', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar tipo caixa', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const tipoCaixa = await TipoCaixaFactory.make()
    const response = await client.post('api/v1/tipocaixa').form(tipoCaixa).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar tipo caixa', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const tipoCaixaAntigo = await TipoCaixa.query().firstOrFail()
    const tipoCaixa = await TipoCaixaFactory.make()
    const response = await client.put(`api/v1/tipocaixa/${tipoCaixaAntigo.id}`).form(tipoCaixa).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar tipo caixa inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const tipoCaixa = await TipoCaixaFactory.make()
    const response = await client.put(`api/v1/tipocaixa/45455`).form(tipoCaixa).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar tipo caixa', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const tipoCaixaAntigo = await TipoCaixa.query().firstOrFail()
    const response = await client.patch(`api/v1/tipocaixa/${tipoCaixaAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os tipos de caixa', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/tipocaixa').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os tipos de caixa ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/tipocaixa/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar tipo caixa por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/tipocaixa/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar tipo caixa por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/tipocaixa/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
