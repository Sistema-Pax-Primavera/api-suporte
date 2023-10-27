import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { PlanoFactory } from 'Database/factories/PlanoFactory'

export default class PlanoSeeder extends BaseSeeder {
  public async run() {
    await PlanoFactory.createMany(3)
  }
}
