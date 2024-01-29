import Associado from "App/Models/Associado"

export default class AssociadoService {

    public async buscarTodos() {
        return await Associado.query()
    }

    public async buscarAtivos() {
        return await Associado.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Associado.findOrFail(id)
    }

    public async cadastrar(associado: any) {
        return await Associado.create(associado)
    }

    public async atualizar(novoAssociado: any, id: number) {
        let associado = await Associado.findOrFail(id)
        associado.merge(novoAssociado)
        return await associado.save()
    }

    public async ativar(id: number) {
        let associado = await Associado.findOrFail(id)
        associado.ativo = !associado.ativo
        return await associado.save()
    }

}