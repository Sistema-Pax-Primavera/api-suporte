import Historico from "App/Models/Historico"

export default class HistoricoService {

    public async buscarTodos() {
        return await Historico.query()
    }

    public async buscarAtivos() {
        return await Historico.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Historico.findOrFail(id)
    }

    public async cadastrar(historico: any) {
        return await Historico.create(historico)
    }

    public async atualizar(novoHistorico: any, id: number) {
        let historico = await Historico.findOrFail(id)
        historico.merge(novoHistorico)
        return await historico.save()
    }

    public async ativar(id: number) {
        let historico = await Historico.findOrFail(id)
        historico.ativo = !historico.ativo
        return await historico.save()
    }

}