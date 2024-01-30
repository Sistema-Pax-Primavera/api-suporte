import HistoricoSolicitacao from "App/Models/HistoricoSolicitacao"

export default class HistoricoSolicitacaoService {

    public async buscarTodos() {
        return await HistoricoSolicitacao.query()
    }

    public async buscarAtivos() {
        return await HistoricoSolicitacao.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await HistoricoSolicitacao.findOrFail(id)
    }

    public async cadastrar(historicoSolicitacao: any) {
        return await HistoricoSolicitacao.create(historicoSolicitacao)
    }

    public async atualizar(novoHistoricoSolicitacao: any, id: number) {
        let historicoSolicitacao = await HistoricoSolicitacao.findOrFail(id)
        historicoSolicitacao.merge(novoHistoricoSolicitacao)
        return await historicoSolicitacao.save()
    }

    public async ativar(id: number) {
        let historicoSolicitacao = await HistoricoSolicitacao.findOrFail(id)
        historicoSolicitacao.ativo = !historicoSolicitacao.ativo
        return await historicoSolicitacao.save()
    }

}