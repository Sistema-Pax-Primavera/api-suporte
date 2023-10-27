import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Bairro from 'App/Models/Bairro'
import Usuario from 'App/Models/Usuario'
import { BairroFactory } from 'Database/factories/BairroFactory'

test.group('Bairro', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar bairro', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const bairro = await BairroFactory.make()
    const response = await client.post('api/v1/bairro').form(bairro).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar bairro', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const bairroAntigo = await Bairro.query().firstOrFail()
    const bairro = await BairroFactory.make()
    const response = await client.put(`api/v1/bairro/${bairroAntigo.id}`).form(bairro).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar bairro inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const bairro = await BairroFactory.make()
    const response = await client.put(`api/v1/bairro/45455`).form(bairro).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar bairro', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const bairroAntigo = await Bairro.query().firstOrFail()
    const response = await client.patch(`api/v1/bairro/${bairroAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os bairros', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/bairro').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os bairros ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/bairro/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar bairro por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/bairro/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar bairro por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/bairro/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
