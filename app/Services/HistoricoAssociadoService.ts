import HistoricoAssociado from "App/Models/HistoricoAssociado"

export default class HistoricoAssociadoService {

    public async buscarTodos() {
        return await HistoricoAssociado.query()
    }

    public async buscarAtivos() {
        return await HistoricoAssociado.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await HistoricoAssociado.findOrFail(id)
    }

    public async cadastrar(historicoAssociado: any) {
        return await HistoricoAssociado.create(historicoAssociado)
    }

    public async atualizar(novoHistoricoAssociado: any, id: number) {
        let historicoAssociado = await HistoricoAssociado.findOrFail(id)
        historicoAssociado.merge(novoHistoricoAssociado)
        return await historicoAssociado.save()
    }

    public async ativar(id: number) {
        let historicoAssociado = await HistoricoAssociado.findOrFail(id)
        historicoAssociado.ativo = !historicoAssociado.ativo
        return await historicoAssociado.save()
    }

}