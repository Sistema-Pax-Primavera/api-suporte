import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Modulo from 'App/Models/Modulo'
import Usuario from 'App/Models/Usuario'
import { ModuloFactory } from 'Database/factories/ModuloFactory'

test.group('Modulo', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar módulo', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const modulo = await ModuloFactory.make()
    const response = await client.post('api/v1/modulo').form(modulo).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar módulo', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const moduloAntigo = await Modulo.query().firstOrFail()
    const modulo = await ModuloFactory.make()
    const response = await client.put(`api/v1/modulo/${moduloAntigo.id}`).form(modulo).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar módulo inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const modulo = await ModuloFactory.make()
    const response = await client.put(`api/v1/modulo/45455`).form(modulo).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar módulo', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const moduloAntigo = await Modulo.query().firstOrFail()
    const response = await client.patch(`api/v1/modulo/${moduloAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os módulos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/modulo').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os módulos ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/modulo/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar módulo por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/modulo/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar módulo por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/modulo/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
