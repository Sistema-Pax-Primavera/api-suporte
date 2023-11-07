import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import { TemplateFactory } from 'Database/factories/TemplateFactory'

export default class TemplateSeeder extends BaseSeeder {
  public async run() {
    await TemplateFactory.createMany(3)
  }
}
