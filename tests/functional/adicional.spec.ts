import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Adicional from 'App/Models/Adicional'
import Usuario from 'App/Models/Usuario'
import { AdicionalFactory } from 'Database/factories/AdicionalFactory'

test.group('Adicional', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar adicional', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const adicional = await AdicionalFactory.make()
    const response = await client.post('api/v1/adicional').form(adicional).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar adicional', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const adicionalAntigo = await Adicional.query().firstOrFail()
    const adicional = await AdicionalFactory.make()
    const response = await client.put(`api/v1/adicional/${adicionalAntigo.id}`).form(adicional).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar adicional inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const adicional = await AdicionalFactory.make()
    const response = await client.put(`api/v1/adicional/45455`).form(adicional).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar adicional', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const adicionalAntigo = await Adicional.query().firstOrFail()
    const response = await client.patch(`api/v1/adicional/${adicionalAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os adicionais', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/adicional').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os adicionais ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/adicional/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar adicional por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/adicional/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar adicional por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/adicional/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
