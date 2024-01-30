import Solicitacao from "App/Models/Solicitacao"

export default class SolicitacaoService {

    public async buscarTodos() {
        return await Solicitacao.query()
    }

    public async buscarAtivos() {
        return await Solicitacao.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Solicitacao.findOrFail(id)
    }

    public async cadastrar(solicitacao: any) {
        return await Solicitacao.create(solicitacao)
    }

    public async atualizar(novaSolicitacao: any, id: number) {
        let solicitacao = await Solicitacao.findOrFail(id)
        solicitacao.merge(novaSolicitacao)
        return await solicitacao.save()
    }

    public async ativar(id: number) {
        let solicitacao = await Solicitacao.findOrFail(id)
        solicitacao.ativo = !solicitacao.ativo
        return await solicitacao.save()
    }

}