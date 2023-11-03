import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CategoriaHistoricoFactory } from 'Database/factories/CategoriaHistoricoFactory'

export default class CategoriaHistoricoSeeder extends BaseSeeder {
  public async run() {
    await CategoriaHistoricoFactory.createMany(3)
  }
}
