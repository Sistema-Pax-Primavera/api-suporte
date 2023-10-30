import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { AdicionalFactory } from 'Database/factories/AdicionalFactory'

export default class AdicionalSeeder extends BaseSeeder {
  public async run() {
    await AdicionalFactory.createMany(3)
  }
}
