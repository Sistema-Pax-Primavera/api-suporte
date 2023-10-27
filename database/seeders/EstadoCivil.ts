import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { EstadoCivilFactory } from 'Database/factories/EstadoCivilFactory'

export default class EstadoCivilSeeder extends BaseSeeder {
  public async run() {
    await EstadoCivilFactory.createMany(3)
  }
}
