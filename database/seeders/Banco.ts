import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { BancoFactory } from 'Database/factories/BancoFactory'

export default class BancoSeeder extends BaseSeeder {
  public async run() {
    await BancoFactory.createMany(3)
  }
}
