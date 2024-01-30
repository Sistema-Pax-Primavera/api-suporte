import UnidadeDevedora from "App/Models/UnidadeDevedora"

export default class UnidadeDevedoraService {

    public async buscarTodos() {
        return await UnidadeDevedora.query()
    }

    public async buscarAtivos() {
        return await UnidadeDevedora.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await UnidadeDevedora.findOrFail(id)
    }

    public async cadastrar(unidadeDevedora: any) {
        return await UnidadeDevedora.create(unidadeDevedora)
    }

    public async atualizar(novaUnidadeDevedora: any, id: number) {
        let unidadeDevedora = await UnidadeDevedora.findOrFail(id)
        unidadeDevedora.merge(novaUnidadeDevedora)
        return await unidadeDevedora.save()
    }

    public async ativar(id: number) {
        let unidadeDevedora = await UnidadeDevedora.findOrFail(id)
        unidadeDevedora.ativo = !unidadeDevedora.ativo
        return await unidadeDevedora.save()
    }

}