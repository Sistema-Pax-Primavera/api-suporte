import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { MunicipioFactory } from 'Database/factories/MunicipioFactory'

export default class MunicipioSeeder extends BaseSeeder {
  public async run() {
    await MunicipioFactory.createMany(3)
  }
}
