import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { FuncaoFactory } from 'Database/factories/FuncaoFactory'

export default class FuncaoSeeder extends BaseSeeder {
  public async run() {
    await FuncaoFactory.createMany(3)
  }
}
