import Adicional from "App/Models/Adicional"

export default class AdicionalService {

    public async buscarTodos() {
        return await Adicional.query()
    }

    public async buscarAtivos() {
        return await Adicional.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Adicional.findOrFail(id)
    }

    public async cadastrar(adicional: any) {
        return await Adicional.create(adicional)
    }

    public async atualizar(novoAdicional: any, id: number) {
        let adicional = await Adicional.findOrFail(id)
        adicional.merge(novoAdicional)
        return await adicional.save()
    }

    public async ativar(id: number) {
        let adicional = await Adicional.findOrFail(id)
        adicional.ativo = !adicional.ativo
        return await adicional.save()
    }

}