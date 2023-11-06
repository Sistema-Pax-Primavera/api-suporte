import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { UnidadeFinanceiraFactory } from 'Database/factories/UnidadeFinanceiraFactory'

export default class UnidadeFinanceiraSeeder extends BaseSeeder {
  public async run() {
    await UnidadeFinanceiraFactory.createMany(3)
  }
}
