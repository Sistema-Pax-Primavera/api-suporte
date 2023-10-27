import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ReligiaoFactory } from 'Database/factories/ReligiaoFactory'

export default class ReligiaoSeeder extends BaseSeeder {
  public async run() {
    await ReligiaoFactory.createMany(3)
  }
}
