import FormaPagamento from "App/Models/FormaPagamento"

export default class FormaPagamentoService {

    public async buscarTodos() {
        return await FormaPagamento.query()
    }

    public async buscarAtivos() {
        return await FormaPagamento.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await FormaPagamento.findOrFail(id)
    }

    public async cadastrar(formaPagamento: any) {
        return await FormaPagamento.create(formaPagamento)
    }

    public async atualizar(novaFormaPagamento: any, id: number) {
        let formaPagamento = await FormaPagamento.findOrFail(id)
        formaPagamento.merge(novaFormaPagamento)
        return await formaPagamento.save()
    }

    public async ativar(id: number) {
        let formaPagamento = await FormaPagamento.findOrFail(id)
        formaPagamento.ativo = !formaPagamento.ativo
        return await formaPagamento.save()
    }

}