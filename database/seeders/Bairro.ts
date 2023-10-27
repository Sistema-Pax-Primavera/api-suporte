import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { BairroFactory } from 'Database/factories/BairroFactory'

export default class BairroSeeder extends BaseSeeder {
  public async run() {
    await BairroFactory.createMany(3)
  }
}
