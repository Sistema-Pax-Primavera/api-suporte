import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { RegiaoBairroFactory } from 'Database/factories/RegiaoBairroFactory'

export default class RegiaoBairroSeeder extends BaseSeeder {
  public async run() {
    await RegiaoBairroFactory.createMany(3)
  }
}
