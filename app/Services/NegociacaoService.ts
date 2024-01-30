import Negociacao from "App/Models/Negociacao"

export default class NegociacaoService {

    public async buscarTodos() {
        return await Negociacao.query()
    }

    public async buscarAtivos() {
        return await Negociacao.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Negociacao.findOrFail(id)
    }

    public async cadastrar(negociacao: any) {
        return await Negociacao.create(negociacao)
    }

    public async atualizar(novaNegociacao: any, id: number) {
        let negociacao = await Negociacao.findOrFail(id)
        negociacao.merge(novaNegociacao)
        return await negociacao.save()
    }

    public async ativar(id: number) {
        let negociacao = await Negociacao.findOrFail(id)
        negociacao.ativo = !negociacao.ativo
        return await negociacao.save()
    }

}