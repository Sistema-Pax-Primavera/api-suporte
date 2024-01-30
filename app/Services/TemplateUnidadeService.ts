import TemplateUnidade from "App/Models/TemplateUnidade"

export default class TemplateUnidadeService {

    public async buscarTodos() {
        return await TemplateUnidade.query()
    }

    public async buscarAtivos() {
        return await TemplateUnidade.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await TemplateUnidade.findOrFail(id)
    }

    public async cadastrar(templateUnidade: any) {
        return await TemplateUnidade.create(templateUnidade)
    }

    public async atualizar(novoTemplateUnidade: any, id: number) {
        let templateUnidade = await TemplateUnidade.findOrFail(id)
        templateUnidade.merge(novoTemplateUnidade)
        return await templateUnidade.save()
    }

    public async ativar(id: number) {
        let templateUnidade = await TemplateUnidade.findOrFail(id)
        templateUnidade.ativo = !templateUnidade.ativo
        return await templateUnidade.save()
    }

}