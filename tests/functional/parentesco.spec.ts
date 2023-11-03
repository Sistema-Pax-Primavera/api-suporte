import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Parentesco from 'App/Models/Parentesco'
import Usuario from 'App/Models/Usuario'
import { ParentescoFactory } from 'Database/factories/ParentescoFactory'

test.group('Parentesco', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar parentesco', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const parentesco = await ParentescoFactory.make()
    const response = await client.post('api/v1/parentesco').form(parentesco).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar parentesco', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const parentescoAntigo = await Parentesco.query().firstOrFail()
    const parentesco = await ParentescoFactory.make()
    const response = await client.put(`api/v1/parentesco/${parentescoAntigo.id}`).form(parentesco).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar parentesco inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const parentesco = await ParentescoFactory.make()
    const response = await client.put(`api/v1/parentesco/45455`).form(parentesco).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar parentesco', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const parentescoAntigo = await Parentesco.query().firstOrFail()
    const response = await client.patch(`api/v1/parentesco/${parentescoAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os parentescos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/parentesco').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os parentescos ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/parentesco/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar parentesco por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/parentesco/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar parentesco por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/parentesco/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
