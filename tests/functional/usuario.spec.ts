import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import Usuario from 'App/Models/Usuario'
import { UsuarioFactory } from 'Database/factories/UsuarioFactory'

test.group('Usuário', async (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Autenticar usuário', async ({ client }) => {
    const usuarioNovo = await UsuarioFactory.make()
    const usuario = await Usuario.create(usuarioNovo)

    const response = await client.post('api/v1/usuario/login').form({
      cpf: usuario.cpf,
      senha: '1234'
    })
    response.assertStatus(200)
  })

  test('Autenticar usuário inválido', async ({ client }) => {
    const response = await client.post('api/v1/usuario/login').form({
      cpf: '353.274.275-60',
      senha: '1234'
    })

    response.assertStatus(400)
  })

  test('Cadastrar usuário', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const usuarioNovo = await UsuarioFactory.make()
    const response = await client.post('api/v1/usuario').form(usuarioNovo).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar usuário', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const usuarioAntigo = await Usuario.query().firstOrFail()
    const usuarioNovo = await UsuarioFactory.make()
    const response = await client.put(`api/v1/usuario/${usuarioAntigo.id}`).form(usuarioNovo).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Editar usuário inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const usuarioNovo = await UsuarioFactory.make()
    const response = await client.put(`api/v1/usuario/45455`).form(usuarioNovo).loginAs(usuario)
    response.assertStatus(404)
  });

  test('Ativar/inativar usuário', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const usuarioAntigo = await Usuario.query().firstOrFail()
    const response = await client.patch(`api/v1/usuario/${usuarioAntigo.id}`).loginAs(usuario)
    response.assertStatus(201)
  });

  test('Buscar todos os usuários', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/usuario').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar todos os usuários ativos', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/usuario/ativos').loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar usuário por id', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get(`api/v1/usuario/${usuario.id}`).loginAs(usuario)
    response.assertStatus(200)
  });

  test('Buscar usuário por id inexistente', async ({ client }) => {
    const usuario = await Usuario.query().firstOrFail()
    const response = await client.get('api/v1/usuario/1231498').loginAs(usuario)
    response.assertStatus(404)
  });
})
