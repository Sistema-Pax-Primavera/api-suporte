import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { SetorFactory } from 'Database/factories/SetorFactory'

export default class SetorSeeder extends BaseSeeder {
  public async run() {
    await SetorFactory.createMany(3)
  }
}
