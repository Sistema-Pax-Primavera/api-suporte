import TitularVenda from "App/Models/TitularVenda"

export default class TitularVendaService {

    public async buscarTodos() {
        return await TitularVenda.query()
    }

    public async buscarAtivos() {
        return await TitularVenda.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await TitularVenda.findOrFail(id)
    }

    public async cadastrar(titularVenda: any) {
        return await TitularVenda.create(titularVenda)
    }

    public async atualizar(novoTitularVenda: any, id: number) {
        let titularVenda = await TitularVenda.findOrFail(id)
        titularVenda.merge(novoTitularVenda)
        return await titularVenda.save()
    }

    public async ativar(id: number) {
        let titularVenda = await TitularVenda.findOrFail(id)
        titularVenda.ativo = !titularVenda.ativo
        return await titularVenda.save()
    }

}