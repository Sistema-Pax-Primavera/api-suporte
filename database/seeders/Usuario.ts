import BaseSeeder from '@adonisjs/lucid/seeders'
import UsuarioFactory from '#database/factories/UsuarioFactory'

export default class UsuarioSeeder extends BaseSeeder {
  public async run() {
    await UsuarioFactory.create()
  }
}