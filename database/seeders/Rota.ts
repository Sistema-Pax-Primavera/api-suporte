import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { RotaFactory } from 'Database/factories/RotaFactory'

export default class RotaSeeder extends BaseSeeder {
  public async run() {
    await RotaFactory.createMany(3)
  }
}
