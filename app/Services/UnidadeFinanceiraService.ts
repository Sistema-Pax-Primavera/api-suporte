import UnidadeFinanceira from "App/Models/UnidadeFinanceira"

export default class UnidadeFinanceiraService {

    public async buscarTodos() {
        return await UnidadeFinanceira.query()
    }

    public async buscarAtivos() {
        return await UnidadeFinanceira.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await UnidadeFinanceira.findOrFail(id)
    }

    public async cadastrar(unidadeFinanceira: any) {
        return await UnidadeFinanceira.create(unidadeFinanceira)
    }

    public async atualizar(novaUnidadeFinanceira: any, id: number) {
        let unidadeFinanceira = await UnidadeFinanceira.findOrFail(id)
        unidadeFinanceira.merge(novaUnidadeFinanceira)
        return await unidadeFinanceira.save()
    }

    public async ativar(id: number) {
        let unidadeFinanceira = await UnidadeFinanceira.findOrFail(id)
        unidadeFinanceira.ativo = !unidadeFinanceira.ativo
        return await unidadeFinanceira.save()
    }

}