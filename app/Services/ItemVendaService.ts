import ItemVenda from "App/Models/ItemVenda"

export default class ItemVendaService {

    public async buscarTodos() {
        return await ItemVenda.query()
    }

    public async buscarAtivos() {
        return await ItemVenda.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await ItemVenda.findOrFail(id)
    }

    public async cadastrar(itemVenda: any) {
        return await ItemVenda.create(itemVenda)
    }

    public async atualizar(novoItemVenda: any, id: number) {
        let itemVenda = await ItemVenda.findOrFail(id)
        itemVenda.merge(novoItemVenda)
        return await itemVenda.save()
    }

    public async ativar(id: number) {
        let itemVenda = await ItemVenda.findOrFail(id)
        itemVenda.ativo = !itemVenda.ativo
        return await itemVenda.save()
    }

}