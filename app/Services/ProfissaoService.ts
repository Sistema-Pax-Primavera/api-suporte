import Profissao from "App/Models/Profissao"

export default class ProfissaoService {

    public async buscarTodos() {
        return await Profissao.query()
    }

    public async buscarAtivos() {
        return await Profissao.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Profissao.findOrFail(id)
    }

    public async cadastrar(profissao: any) {
        return await Profissao.create(profissao)
    }

    public async atualizar(novo_profissao: any, id: number) {
        let profissao = await Profissao.findOrFail(id)
        profissao.merge(novo_profissao)
        return await profissao.save()
    }

    public async ativar(id: number) {
        let profissao = await Profissao.findOrFail(id)
        profissao.ativo = !profissao.ativo
        return await profissao.save()
    }

}