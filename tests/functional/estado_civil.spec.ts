import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import EstadoCivil from 'App/Models/EstadoCivil'
import Usuario from 'App/Models/Usuario'
import { EstadoCivilFactory } from 'Database/factories/EstadoCivilFactory'

test.group('EstadoCivil', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar estado civil', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const estadoCivil = await EstadoCivilFactory.make()
    const response = await client.post('api/v1/estadocivil').form(estadoCivil).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar estado civil', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const estadoCivilAntigo = await EstadoCivil.query().firstOrFail()
    const estadoCivil = await EstadoCivilFactory.make()
    const response = await client.put(`api/v1/estadocivil/${estadoCivilAntigo.id}`).form(estadoCivil).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar estado civil inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const estadoCivil = await EstadoCivilFactory.make()
    const response = await client.put(`api/v1/estadocivil/45455`).form(estadoCivil).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar estado civil', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const estadoCivilAntigo = await EstadoCivil.query().firstOrFail()
    const response = await client.patch(`api/v1/estadocivil/${estadoCivilAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os estados civis', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/estadocivil').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os estados civis ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/estadocivil/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar estado civil por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/estadocivil/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar estado civil por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/estadocivil/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
