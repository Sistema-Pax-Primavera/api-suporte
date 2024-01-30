import PlanoUnidade from "App/Models/PlanoUnidade"

export default class PlanoUnidadeService {

    public async buscarTodos() {
        return await PlanoUnidade.query()
    }

    public async buscarAtivos() {
        return await PlanoUnidade.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await PlanoUnidade.findOrFail(id)
    }

    public async cadastrar(planoUnidade: any) {
        return await PlanoUnidade.create(planoUnidade)
    }

    public async atualizar(novoPlanoUnidade: any, id: number) {
        let planoUnidade = await PlanoUnidade.findOrFail(id)
        planoUnidade.merge(novoPlanoUnidade)
        return await planoUnidade.save()
    }

    public async ativar(id: number) {
        let planoUnidade = await PlanoUnidade.findOrFail(id)
        planoUnidade.ativo = !planoUnidade.ativo
        return await planoUnidade.save()
    }

}