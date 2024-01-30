import Template from "App/Models/Template"

export default class TemplateService {

    public async buscarTodos() {
        return await Template.query()
    }

    public async buscarAtivos() {
        return await Template.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Template.findOrFail(id)
    }

    public async cadastrar(template: any) {
        return await Template.create(template)
    }

    public async atualizar(novoTemplate: any, id: number) {
        let template = await Template.findOrFail(id)
        template.merge(novoTemplate)
        return await template.save()
    }

    public async ativar(id: number) {
        let template = await Template.findOrFail(id)
        template.ativo = !template.ativo
        return await template.save()
    }

}