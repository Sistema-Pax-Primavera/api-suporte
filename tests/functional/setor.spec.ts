import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Setor from 'App/Models/Setor'
import Usuario from 'App/Models/Usuario'
import { SetorFactory } from 'Database/factories/SetorFactory'

test.group('Setor', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar setor', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const setor = await SetorFactory.make()
    const response = await client.post('api/v1/setor').form(setor).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar setor', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const setorAntigo = await Setor.query().firstOrFail()
    const setor = await SetorFactory.make()
    const response = await client.put(`api/v1/setor/${setorAntigo.id}`).form(setor).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar setor inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const setor = await SetorFactory.make()
    const response = await client.put(`api/v1/setor/45455`).form(setor).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar setor', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const setorAntigo = await Setor.query().firstOrFail()
    const response = await client.patch(`api/v1/setor/${setorAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os setores', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/setor').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os setores ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/setor/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar setor por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/setor/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar setor por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/setor/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
