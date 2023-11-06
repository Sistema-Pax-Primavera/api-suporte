import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ContaFactory } from 'Database/factories/ContaFactory'

export default class ContaSeeder extends BaseSeeder {
  public async run() {
    await ContaFactory.createMany(3)
  }
}
