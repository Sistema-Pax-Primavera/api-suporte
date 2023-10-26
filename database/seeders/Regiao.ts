import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { RegiaoFactory } from 'Database/factories/RegiaoFactory'

export default class RegiaoSeeder extends BaseSeeder {
  public async run() {
    await RegiaoFactory.createMany(3)
  }
}
