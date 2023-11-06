import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { SubCategoriaHistoricoFactory } from 'Database/factories/SubCategoriaHistoricoFactory'

export default class SubCategoriaHistoricoSeeder extends BaseSeeder {
  public async run() {
    await SubCategoriaHistoricoFactory.createMany(3)
  }
}
