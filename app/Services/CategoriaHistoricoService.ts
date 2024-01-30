import CategoriaHistorico from "App/Models/CategoriaHistorico"

export default class CategoriaHistoricoService {

    public async buscarTodos() {
        return await CategoriaHistorico.query()
    }

    public async buscarAtivos() {
        return await CategoriaHistorico.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await CategoriaHistorico.findOrFail(id)
    }

    public async cadastrar(categoriaHistorico: any) {
        return await CategoriaHistorico.create(categoriaHistorico)
    }

    public async atualizar(novaCategoriaHistorico: any, id: number) {
        let categoriaHistorico = await CategoriaHistorico.findOrFail(id)
        categoriaHistorico.merge(novaCategoriaHistorico)
        return await categoriaHistorico.save()
    }

    public async ativar(id: number) {
        let categoriaHistorico = await CategoriaHistorico.findOrFail(id)
        categoriaHistorico.ativo = !categoriaHistorico.ativo
        return await categoriaHistorico.save()
    }

}