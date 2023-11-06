import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CategoriaItemFactory } from 'Database/factories/CategoriaItemFactory'

export default class CategoriaItemSeeder extends BaseSeeder {
  public async run() {
    await CategoriaItemFactory.createMany(3)
  }
}
