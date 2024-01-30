import Regiao from "App/Models/Regiao"

export default class RegiaoService {

    public async buscarTodos() {
        return await Regiao.query()
    }

    public async buscarAtivos() {
        return await Regiao.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Regiao.findOrFail(id)
    }

    public async cadastrar(regiao: any) {
        return await Regiao.create(regiao)
    }

    public async atualizar(novaRegiao: any, id: number) {
        let regiao = await Regiao.findOrFail(id)
        regiao.merge(novaRegiao)
        return await regiao.save()
    }

    public async ativar(id: number) {
        let regiao = await Regiao.findOrFail(id)
        regiao.ativo = !regiao.ativo
        return await regiao.save()
    }

}