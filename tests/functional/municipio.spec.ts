import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Municipio from 'App/Models/Municipio'
import Usuario from 'App/Models/Usuario'
import { MunicipioFactory } from 'Database/factories/MunicipioFactory'

test.group('Município', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar município', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const municipio = await MunicipioFactory.make()
    const response = await client.post('api/v1/municipio').form(municipio).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar município', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const municipioAntigo = await Municipio.query().firstOrFail()
    const municipio = await MunicipioFactory.make()
    const response = await client.put(`api/v1/municipio/${municipioAntigo.id}`).form(municipio).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar município inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const municipio = await MunicipioFactory.make()
    const response = await client.put(`api/v1/municipio/45455`).form(municipio).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar município', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const municipioAntigo = await Municipio.query().firstOrFail()
    const response = await client.patch(`api/v1/municipio/${municipioAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os municípios', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/municipio').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os municípios ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/municipio/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar município por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/municipio/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar município por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/municipio/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
