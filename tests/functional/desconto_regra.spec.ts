import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import DescontoRegra from 'App/Models/DescontoRegra'
import Usuario from 'App/Models/Usuario'
import { DescontoRegraFactory } from 'Database/factories/DescontoRegraFactory'

test.group('Desconto Regra', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar desconto regra', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const descontoRegra = await DescontoRegraFactory.make()
    const response = await client.post('api/v1/descontoregra').form(descontoRegra).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar desconto regra', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const descontoRegraAntigo = await DescontoRegra.query().firstOrFail()
    const descontoRegra = await DescontoRegraFactory.make()
    const response = await client.put(`api/v1/descontoregra/${descontoRegraAntigo.id}`).form(descontoRegra).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar desconto regra inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const descontoRegra = await DescontoRegraFactory.make()
    const response = await client.put(`api/v1/descontoregra/45455`).form(descontoRegra).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar desconto regra', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const descontoRegraAntigo = await DescontoRegra.query().firstOrFail()
    const response = await client.patch(`api/v1/descontoregra/${descontoRegraAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os descontos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/descontoregra').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os descontos ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/descontoregra/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar desconto regra por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/descontoregra/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar desconto regra por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/descontoregra/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
