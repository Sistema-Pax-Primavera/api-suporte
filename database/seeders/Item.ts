import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ItemFactory } from 'Database/factories/ItemFactory'

export default class ItemSeeder extends BaseSeeder {
  public async run() {
    await ItemFactory.createMany(3)
  }
}
