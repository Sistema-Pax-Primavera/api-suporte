import CategoriaItem from "App/Models/CategoriaItem"

export default class CategoriaItemService {

    public async buscarTodos() {
        return await CategoriaItem.query()
    }

    public async buscarAtivos() {
        return await CategoriaItem.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await CategoriaItem.findOrFail(id)
    }

    public async cadastrar(categoriaItem: any) {
        return await CategoriaItem.create(categoriaItem)
    }

    public async atualizar(novaCategoriaItem: any, id: number) {
        let categoriaItem = await CategoriaItem.findOrFail(id)
        categoriaItem.merge(novaCategoriaItem)
        return await categoriaItem.save()
    }

    public async ativar(id: number) {
        let categoriaItem = await CategoriaItem.findOrFail(id)
        categoriaItem.ativo = !categoriaItem.ativo
        return await categoriaItem.save()
    }

}