import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import UsuarioController from 'App/Controllers/Http/UsuarioController'
import Permissao from 'App/Models/Permissao'
import Usuario from 'App/Models/Usuario'

test.group('UsuarioController', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Vincular módulos', async (assert) => {
    const usuarioController = new UsuarioController()

    const usuarioEncontrado = await Usuario.firstOrFail()
    const usuario = 'TESTUSER'

    const permissoes = [
      {
        unidadeId: 1, moduloId: 1, acao: ['LER', 'GRAVAR']
      },
      {
        unidadeId: 2, moduloId: 1, acao: ['LER', 'GRAVAR']
      }
    ]
      
    await usuarioController.vincularPermissoes(permissoes, usuarioEncontrado.id, usuario).then(async () => {
      const permissoesVinculadas = await Permissao.query().where({
        usuarioId: usuarioEncontrado.id,
        createdBy: usuario,
      })

      assert.assert.isArray(permissoesVinculadas)
      assert.assert.lengthOf(permissoesVinculadas, permissoes.length)
    }).catch((err) => {
      assert.assert.fail(`O teste falhou - ${err.message}`)
    })
  })
})

