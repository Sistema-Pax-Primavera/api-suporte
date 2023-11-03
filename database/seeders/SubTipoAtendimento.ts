import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { SubTipoAtendimentoFactory } from 'Database/factories/SubTipoAtendimentoFactory'

export default class SubTipoAtendimentoSeeder extends BaseSeeder {
  public async run() {
    await SubTipoAtendimentoFactory.createMany(3)
  }
}
