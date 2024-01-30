import CartaoAssociado from "App/Models/CartaoAssociado"

export default class CartaoAssociadoService {

    public async buscarTodos() {
        return await CartaoAssociado.query()
    }

    public async buscarAtivos() {
        return await CartaoAssociado.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await CartaoAssociado.findOrFail(id)
    }

    public async cadastrar(cartaoAssociado: any) {
        return await CartaoAssociado.create(cartaoAssociado)
    }

    public async atualizar(novoCartaoAssociado: any, id: number) {
        let cartaoAssociado = await CartaoAssociado.findOrFail(id)
        cartaoAssociado.merge(novoCartaoAssociado)
        return await cartaoAssociado.save()
    }

    public async ativar(id: number) {
        let cartaoAssociado = await CartaoAssociado.findOrFail(id)
        cartaoAssociado.ativo = !cartaoAssociado.ativo
        return await cartaoAssociado.save()
    }

}