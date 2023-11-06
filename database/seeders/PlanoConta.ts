import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PlanoContaFactory } from 'Database/factories/PlanoContaFactory'

export default class PlanoContaSeeder extends BaseSeeder {
  public async run() {
    await PlanoContaFactory.createMany(3)
  }
}
