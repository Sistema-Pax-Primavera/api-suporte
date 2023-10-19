import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UnidadeFactory } from 'Database/factories/UnidadeFactory'

export default class UnidadeSeeder extends BaseSeeder {
  public async run() {
    await UnidadeFactory.createMany(3)
  }
}
