import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { FornecedorFactory } from 'Database/factories/FornecedorFactory'

export default class FornecedorSeeder extends BaseSeeder {
  public async run() {
    await FornecedorFactory.createMany(3)
  }
}
