import DescontoUnidade from "App/Models/DescontoUnidade"

export default class DescontoUnidadeService {

    public async buscarTodos() {
        return await DescontoUnidade.query()
    }

    public async buscarAtivos() {
        return await DescontoUnidade.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await DescontoUnidade.findOrFail(id)
    }

    public async cadastrar(descontoUnidade: any) {
        return await DescontoUnidade.create(descontoUnidade)
    }

    public async atualizar(novoDescontoUnidade: any, id: number) {
        let descontoUnidade = await DescontoUnidade.findOrFail(id)
        descontoUnidade.merge(novoDescontoUnidade)
        return await descontoUnidade.save()
    }

    public async ativar(id: number) {
        let descontoUnidade = await DescontoUnidade.findOrFail(id)
        descontoUnidade.ativo = !descontoUnidade.ativo
        return await descontoUnidade.save()
    }

}