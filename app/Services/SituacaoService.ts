import Situacao from "App/Models/Situacao"

export default class SituacaoService {

    public async buscarTodos() {
        return await Situacao.query()
    }

    public async buscarAtivos() {
        return await Situacao.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Situacao.findOrFail(id)
    }

    public async cadastrar(situacao: any) {
        return await Situacao.create(situacao)
    }

    public async atualizar(novaSituacao: any, id: number) {
        let situacao = await Situacao.findOrFail(id)
        situacao.merge(novaSituacao)
        return await situacao.save()
    }

    public async ativar(id: number) {
        let situacao = await Situacao.findOrFail(id)
        situacao.ativo = !situacao.ativo
        return await situacao.save()
    }

}