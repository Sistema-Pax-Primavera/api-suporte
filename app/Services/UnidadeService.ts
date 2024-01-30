import Unidade from "App/Models/Unidade"

export default class UnidadeService {

    public async buscarTodos() {
        return await Unidade.query()
    }

    public async buscarAtivos() {
        return await Unidade.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Unidade.findOrFail(id)
    }

    public async cadastrar(unidade: any) {
        return await Unidade.create(unidade)
    }

    public async atualizar(novaUnidade: any, id: number) {
        let unidade = await Unidade.findOrFail(id)
        unidade.merge(novaUnidade)
        return await unidade.save()
    }

    public async ativar(id: number) {
        let unidade = await Unidade.findOrFail(id)
        unidade.ativo = !unidade.ativo
        return await unidade.save()
    }

}