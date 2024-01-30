import Item from "App/Models/Item"

export default class ItemService {

    public async buscarTodos() {
        return await Item.query()
    }

    public async buscarAtivos() {
        return await Item.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Item.findOrFail(id)
    }

    public async cadastrar(item: any) {
        return await Item.create(item)
    }

    public async atualizar(novoItem: any, id: number) {
        let item = await Item.findOrFail(id)
        item.merge(novoItem)
        return await item.save()
    }

    public async ativar(id: number) {
        let item = await Item.findOrFail(id)
        item.ativo = !item.ativo
        return await item.save()
    }

}