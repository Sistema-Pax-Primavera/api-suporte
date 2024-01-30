import Funcao from "App/Models/Funcao"

export default class FuncaoService {

    public async buscarTodos() {
        return await Funcao.query()
    }

    public async buscarAtivos() {
        return await Funcao.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Funcao.findOrFail(id)
    }

    public async cadastrar(funcao: any) {
        return await Funcao.create(funcao)
    }

    public async atualizar(novaFuncao: any, id: number) {
        let funcao = await Funcao.findOrFail(id)
        funcao.merge(novaFuncao)
        return await funcao.save()
    }

    public async ativar(id: number) {
        let funcao = await Funcao.findOrFail(id)
        funcao.ativo = !funcao.ativo
        return await funcao.save()
    }

}