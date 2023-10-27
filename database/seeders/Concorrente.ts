import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ConcorrenteFactory } from 'Database/factories/ConcorrenteFactory'

export default class ConcorrenteSeeder extends BaseSeeder {
  public async run() {
    await ConcorrenteFactory.createMany(3)
  }
}
