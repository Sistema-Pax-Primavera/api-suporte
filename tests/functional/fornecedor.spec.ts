import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Fornecedor from 'App/Models/Fornecedor'
import Usuario from 'App/Models/Usuario'
import { FornecedorFactory } from 'Database/factories/FornecedorFactory'

test.group('Fornecedor', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Cadastrar fornecedor', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const fornecedor = await FornecedorFactory.make()
    const response = await client.post('api/v1/fornecedor').form(fornecedor).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar fornecedor', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const fornecedorAntigo = await Fornecedor.query().firstOrFail()
    const fornecedor = await FornecedorFactory.make()
    const response = await client.put(`api/v1/fornecedor/${fornecedorAntigo.id}`).form(fornecedor).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar fornecedor inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const fornecedor = await FornecedorFactory.make()
    const response = await client.put(`api/v1/fornecedor/45455`).form(fornecedor).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar fornecedor', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const fornecedorAntigo = await Fornecedor.query().firstOrFail()
    const response = await client.patch(`api/v1/fornecedor/${fornecedorAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os fornecedores', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/fornecedor').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os fornecedores ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/fornecedor/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar fornecedor por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/fornecedor/1').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar fornecedor por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/fornecedor/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
