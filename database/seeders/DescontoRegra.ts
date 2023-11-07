import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { DescontoRegraFactory } from 'Database/factories/DescontoRegraFactory'

export default class DescontoRegraSeeder extends BaseSeeder {
  public async run() {
    await DescontoRegraFactory.createMany(3)
  }
}
