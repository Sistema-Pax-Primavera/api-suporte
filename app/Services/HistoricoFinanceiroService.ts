import HistoricoFinanceiro from "App/Models/HistoricoFinanceiro"

export default class HistoricoFinanceiroService {

    public async buscarTodos() {
        return await HistoricoFinanceiro.query()
    }

    public async buscarAtivos() {
        return await HistoricoFinanceiro.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await HistoricoFinanceiro.findOrFail(id)
    }

    public async cadastrar(historicoFinanceiro: any) {
        return await HistoricoFinanceiro.create(historicoFinanceiro)
    }

    public async atualizar(novoHistoricoFinanceiro: any, id: number) {
        let historicoFinanceiro = await HistoricoFinanceiro.findOrFail(id)
        historicoFinanceiro.merge(novoHistoricoFinanceiro)
        return await historicoFinanceiro.save()
    }

    public async ativar(id: number) {
        let historicoFinanceiro = await HistoricoFinanceiro.findOrFail(id)
        historicoFinanceiro.ativo = !historicoFinanceiro.ativo
        return await historicoFinanceiro.save()
    }

}