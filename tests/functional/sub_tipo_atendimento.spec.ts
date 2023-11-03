import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import SubTipoAtendimento from 'App/Models/SubTipoAtendimento'
import Usuario from 'App/Models/Usuario'
import { SubTipoAtendimentoFactory } from 'Database/factories/SubTipoAtendimentoFactory'

test.group('Sub Tipo Atendimento', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar sub-tipo atendimento', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const subTipoAtendimento = await SubTipoAtendimentoFactory.make()
    const response = await client.post('api/v1/subtipoatendimento').form(subTipoAtendimento).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar sub-tipo atendimento', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const subTipoAtendimentoAntigo = await SubTipoAtendimento.query().firstOrFail()
    const subTipoAtendimento = await SubTipoAtendimentoFactory.make()
    const response = await client.put(`api/v1/subtipoatendimento/${subTipoAtendimentoAntigo.id}`).form(subTipoAtendimento).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar sub-tipo atendimento inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const subTipoAtendimento = await SubTipoAtendimentoFactory.make()
    const response = await client.put(`api/v1/subtipoatendimento/45455`).form(subTipoAtendimento).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar sub-tipo atendimento', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const subTipoAtendimentoAntigo = await SubTipoAtendimento.query().firstOrFail()
    const response = await client.patch(`api/v1/subtipoatendimento/${subTipoAtendimentoAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os sub-tipos de atendimento', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/subtipoatendimento').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os sub-tipos de atendimento ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/subtipoatendimento/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar sub-tipo atendimento por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/subtipoatendimento/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar sub-tipo atendimento por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/subtipoatendimento/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
