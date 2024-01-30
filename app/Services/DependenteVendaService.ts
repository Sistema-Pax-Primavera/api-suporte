import DependenteVenda from "App/Models/DependenteVenda"

export default class DependenteVendaService {

    public async buscarTodos() {
        return await DependenteVenda.query()
    }

    public async buscarAtivos() {
        return await DependenteVenda.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await DependenteVenda.findOrFail(id)
    }

    public async cadastrar(dependenteVenda: any) {
        return await DependenteVenda.create(dependenteVenda)
    }

    public async atualizar(novoDependenteVenda: any, id: number) {
        let dependenteVenda = await DependenteVenda.findOrFail(id)
        dependenteVenda.merge(novoDependenteVenda)
        return await dependenteVenda.save()
    }

    public async ativar(id: number) {
        let dependenteVenda = await DependenteVenda.findOrFail(id)
        dependenteVenda.ativo = !dependenteVenda.ativo
        return await dependenteVenda.save()
    }

}