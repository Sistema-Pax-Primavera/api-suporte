import AssociadoItem from "App/Models/AssociadoItem"

export default class AssociadoItemService {

    public async buscarTodos() {
        return await AssociadoItem.query()
    }

    public async buscarAtivos() {
        return await AssociadoItem.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await AssociadoItem.findOrFail(id)
    }

    public async cadastrar(associadoItem: any) {
        return await AssociadoItem.create(associadoItem)
    }

    public async atualizar(novoAssociadoItem: any, id: number) {
        let associadoItem = await AssociadoItem.findOrFail(id)
        associadoItem.merge(novoAssociadoItem)
        return await associadoItem.save()
    }

    public async ativar(id: number) {
        let associadoItem = await AssociadoItem.findOrFail(id)
        associadoItem.ativo = !associadoItem.ativo
        return await associadoItem.save()
    }

}