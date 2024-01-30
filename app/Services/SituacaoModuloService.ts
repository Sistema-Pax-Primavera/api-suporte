import SituacaoModulo from "App/Models/SituacaoModulo"

export default class SituacaoModuloService {

    public async buscarTodos() {
        return await SituacaoModulo.query()
    }

    public async buscarAtivos() {
        return await SituacaoModulo.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await SituacaoModulo.findOrFail(id)
    }

    public async cadastrar(situacaoModulo: any) {
        return await SituacaoModulo.create(situacaoModulo)
    }

    public async atualizar(novaSituacaoModulo: any, id: number) {
        let situacaoModulo = await SituacaoModulo.findOrFail(id)
        situacaoModulo.merge(novaSituacaoModulo)
        return await situacaoModulo.save()
    }

    public async ativar(id: number) {
        let situacaoModulo = await SituacaoModulo.findOrFail(id)
        situacaoModulo.ativo = !situacaoModulo.ativo
        return await situacaoModulo.save()
    }

}