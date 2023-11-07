import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { CampoSuporteFactory } from 'Database/factories/CampoSuporteFactory'

export default class CampoSuporteSeeder extends BaseSeeder {
  public async run() {
    await CampoSuporteFactory.createMany(3)
  }
}
