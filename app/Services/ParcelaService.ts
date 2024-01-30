import Parcela from "App/Models/Parcela"

export default class ParcelaService {

    public async buscarTodos() {
        return await Parcela.query()
    }

    public async buscarAtivos() {
        return await Parcela.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Parcela.findOrFail(id)
    }

    public async cadastrar(parcela: any) {
        return await Parcela.create(parcela)
    }

    public async atualizar(novaParcela: any, id: number) {
        let parcela = await Parcela.findOrFail(id)
        parcela.merge(novaParcela)
        return await parcela.save()
    }

    public async ativar(id: number) {
        let parcela = await Parcela.findOrFail(id)
        parcela.ativo = !parcela.ativo
        return await parcela.save()
    }

}