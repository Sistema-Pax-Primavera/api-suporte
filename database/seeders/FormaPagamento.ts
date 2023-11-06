import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { FormaPagamentoFactory } from 'Database/factories/FormaPagamentoFactory'

export default class FormaPagamentoSeeder extends BaseSeeder {
  public async run() {
    await FormaPagamentoFactory.createMany(3)
  }
}
