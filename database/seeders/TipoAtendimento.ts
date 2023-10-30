import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TipoAtendimentoFactory } from 'Database/factories/TipoAtendimentoFactory'

export default class TipoAtendimentoSeeder extends BaseSeeder {
  public async run() {
    await TipoAtendimentoFactory.createMany(3)
  }
}
