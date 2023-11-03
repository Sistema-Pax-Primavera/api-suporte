import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { EspecieFactory } from 'Database/factories/EspecieFactory'

export default class EspecieSeeder extends BaseSeeder {
  public async run() {
    await EspecieFactory.createMany(3)
  }
}
