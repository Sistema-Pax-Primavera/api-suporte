import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { RacaFactory } from 'Database/factories/RacaFactory'

export default class RacaSeeder extends BaseSeeder {
  public async run() {
    await RacaFactory.createMany(3)
  }
}
