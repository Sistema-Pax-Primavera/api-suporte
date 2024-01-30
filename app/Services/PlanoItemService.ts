import PlanoItem from "App/Models/PlanoItem"

export default class PlanoItemService {

    public async buscarTodos() {
        return await PlanoItem.query()
    }

    public async buscarAtivos() {
        return await PlanoItem.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await PlanoItem.findOrFail(id)
    }

    public async cadastrar(planoItem: any) {
        return await PlanoItem.create(planoItem)
    }

    public async atualizar(novoPlanoItem: any, id: number) {
        let planoItem = await PlanoItem.findOrFail(id)
        planoItem.merge(novoPlanoItem)
        return await planoItem.save()
    }

    public async ativar(id: number) {
        let planoItem = await PlanoItem.findOrFail(id)
        planoItem.ativo = !planoItem.ativo
        return await planoItem.save()
    }

}