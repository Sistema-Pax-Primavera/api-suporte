import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CategoriaSuporteFactory } from 'Database/factories/CategoriaSuporteFactory'

export default class CategoriaSuporteSeeder extends BaseSeeder {
  public async run() {
    await CategoriaSuporteFactory.createMany(3)
  }
}
