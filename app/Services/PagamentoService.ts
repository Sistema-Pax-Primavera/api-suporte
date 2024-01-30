import Pagamento from "App/Models/Pagamento"

export default class PagamentoService {

    public async buscarTodos() {
        return await Pagamento.query()
    }

    public async buscarAtivos() {
        return await Pagamento.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Pagamento.findOrFail(id)
    }

    public async cadastrar(pagamento: any) {
        return await Pagamento.create(pagamento)
    }

    public async atualizar(novoPagamento: any, id: number) {
        let pagamento = await Pagamento.findOrFail(id)
        pagamento.merge(novoPagamento)
        return await pagamento.save()
    }

    public async ativar(id: number) {
        let pagamento = await Pagamento.findOrFail(id)
        pagamento.ativo = !pagamento.ativo
        return await pagamento.save()
    }

}