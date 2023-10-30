import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import TipoAtendimento from 'App/Models/TipoAtendimento'
import Usuario from 'App/Models/Usuario'
import { TipoAtendimentoFactory } from 'Database/factories/TipoAtendimentoFactory'

test.group('TipoAtendimento', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar tipo atendimento', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const tipoAtendimento = await TipoAtendimentoFactory.make()
    const response = await client.post('api/v1/tipoatendimento').form(tipoAtendimento).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar tipo atendimento', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const tipoAtendimentoAntigo = await TipoAtendimento.query().firstOrFail()
    const tipoAtendimento = await TipoAtendimentoFactory.make()
    const response = await client.put(`api/v1/tipoatendimento/${tipoAtendimentoAntigo.id}`).form(tipoAtendimento).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar tipo atendimento inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const tipoAtendimento = await TipoAtendimentoFactory.make()
    const response = await client.put(`api/v1/tipoatendimento/45455`).form(tipoAtendimento).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar tipo atendimento', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const tipoAtendimentoAntigo = await TipoAtendimento.query().firstOrFail()
    const response = await client.patch(`api/v1/tipoatendimento/${tipoAtendimentoAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os tipos de atendimento', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/tipoatendimento').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os tipos de atendimento ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/tipoatendimento/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar tipo atendimento por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/tipoatendimento/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar tipo atendimento por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/tipoatendimento/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
