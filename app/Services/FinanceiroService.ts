import Financeiro from "App/Models/Financeiro"

export default class FinanceiroService {

    public async buscarTodos() {
        return await Financeiro.query()
    }

    public async buscarAtivos() {
        return await Financeiro.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Financeiro.findOrFail(id)
    }

    public async cadastrar(financeiro: any) {
        return await Financeiro.create(financeiro)
    }

    public async atualizar(novoFinanceiro: any, id: number) {
        let financeiro = await Financeiro.findOrFail(id)
        financeiro.merge(novoFinanceiro)
        return await financeiro.save()
    }

    public async ativar(id: number) {
        let financeiro = await Financeiro.findOrFail(id)
        financeiro.ativo = !financeiro.ativo
        return await financeiro.save()
    }

}