import AdicionalUnidade from "App/Models/AdicionalUnidade"

export default class AdicionalUnidadeService {

    public async buscarTodos() {
        return await AdicionalUnidade.query()
    }

    public async buscarAtivos() {
        return await AdicionalUnidade.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await AdicionalUnidade.findOrFail(id)
    }

    public async cadastrar(adicionalUnidade: any) {
        return await AdicionalUnidade.create(adicionalUnidade)
    }

    public async atualizar(novoAdicionalUnidade: any, id: number) {
        let adicionalUnidade = await AdicionalUnidade.findOrFail(id)
        adicionalUnidade.merge(novoAdicionalUnidade)
        return await adicionalUnidade.save()
    }

    public async ativar(id: number) {
        let adicionalUnidade = await AdicionalUnidade.findOrFail(id)
        adicionalUnidade.ativo = !adicionalUnidade.ativo
        return await adicionalUnidade.save()
    }

}