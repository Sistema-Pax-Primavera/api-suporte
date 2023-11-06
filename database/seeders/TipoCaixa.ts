import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TipoCaixaFactory } from 'Database/factories/TipoCaixaFactory'

export default class TipoCaixaSeeder extends BaseSeeder {
  public async run() {
    await TipoCaixaFactory.createMany(3)
  }
}
