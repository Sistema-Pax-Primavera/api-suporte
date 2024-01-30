import SubCategoriaHistorico from "App/Models/SubCategoriaHistorico"

export default class SubCategoriaHistoricoService {

    public async buscarTodos() {
        return await SubCategoriaHistorico.query()
    }

    public async buscarAtivos() {
        return await SubCategoriaHistorico.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await SubCategoriaHistorico.findOrFail(id)
    }

    public async cadastrar(subCategoriaHistorico: any) {
        return await SubCategoriaHistorico.create(subCategoriaHistorico)
    }

    public async atualizar(novaSubCategoriaHistorico: any, id: number) {
        let subCategoriaHistorico = await SubCategoriaHistorico.findOrFail(id)
        subCategoriaHistorico.merge(novaSubCategoriaHistorico)
        return await subCategoriaHistorico.save()
    }

    public async ativar(id: number) {
        let subCategoriaHistorico = await SubCategoriaHistorico.findOrFail(id)
        subCategoriaHistorico.ativo = !subCategoriaHistorico.ativo
        return await subCategoriaHistorico.save()
    }

}