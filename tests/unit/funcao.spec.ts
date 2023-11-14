import Database from '@ioc:Adonis/Lucid/Database'
import { test } from '@japa/runner'
import FuncaoController from 'App/Controllers/Http/FuncaoController'
import Modulo from 'App/Models/Modulo'
import ModuloFuncao from 'App/Models/ModuloFuncao'

test.group('FuncaoController', (group) => {
  group.each.setup(async () => {
    await Database.beginGlobalTransaction()
    return () => Database.rollbackGlobalTransaction()
  })

  test('Vincular módulos', async (assert) => {
    const funcaoController = new FuncaoController()

    const funcaoId = 1
    const usuario = 'TESTUSER'

    const modulos = await Modulo.createMany([
      {
        descricao: "TESTE 1",
        createdBy: usuario

      },
      {
        descricao: "TESTE 2",
        createdBy: usuario
      }
    ])

    const modulosFormatados = modulos.flatMap((item) => {
      return ({
        moduloId: item.id, acao: ['LER', 'GRAVAR']
      })
    })

    await funcaoController.vincularModulos(modulosFormatados, funcaoId, usuario).then(async () => {
      const modulosVinculados = await ModuloFuncao.query().where({
        funcaoId: funcaoId,
        createdBy: usuario,
      })

      assert.assert.isArray(modulosVinculados)
      assert.assert.lengthOf(modulosVinculados, modulos.length)
    }).catch((err) => {
      assert.assert.fail(`O teste falhou - ${err.message}`)
    })
  })
})

