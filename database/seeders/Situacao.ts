import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { SituacaoFactory } from 'Database/factories/SituacaoFactory'

export default class SituacaoSeeder extends BaseSeeder {
  public async run() {
    await SituacaoFactory.createMany(3)
  }
}
