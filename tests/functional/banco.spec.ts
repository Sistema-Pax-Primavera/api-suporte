import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Banco from 'App/Models/Banco'
import Usuario from 'App/Models/Usuario'
import { BancoFactory } from 'Database/factories/BancoFactory'

test.group('Banco', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar banco', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const banco = await BancoFactory.make()
    const response = await client.post('api/v1/banco').form(banco).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar banco', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const bancoAntigo = await Banco.query().firstOrFail()
    const banco = await BancoFactory.make()
    const response = await client.put(`api/v1/banco/${bancoAntigo.id}`).form(banco).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar banco inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const banco = await BancoFactory.make()
    const response = await client.put(`api/v1/banco/45455`).form(banco).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar banco', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const bancoAntigo = await Banco.query().firstOrFail()
    const response = await client.patch(`api/v1/banco/${bancoAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os bancos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/banco').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os bancos ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/banco/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar banco por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/banco/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar banco por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/banco/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
