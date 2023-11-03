import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { ParentescoFactory } from 'Database/factories/ParentescoFactory'

export default class ParentescoSeeder extends BaseSeeder {
  public async run() {
    await ParentescoFactory.createMany(3)
  }
}
