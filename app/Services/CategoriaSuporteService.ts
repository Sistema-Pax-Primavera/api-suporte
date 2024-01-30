import CategoriaSuporte from "App/Models/CategoriaSuporte"

export default class CategoriaSuporteService {

    public async buscarTodos() {
        return await CategoriaSuporte.query()
    }

    public async buscarAtivos() {
        return await CategoriaSuporte.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await CategoriaSuporte.findOrFail(id)
    }

    public async cadastrar(categoriaSuporte: any) {
        return await CategoriaSuporte.create(categoriaSuporte)
    }

    public async atualizar(novaCategoriaSuporte: any, id: number) {
        let categoriaSuporte = await CategoriaSuporte.findOrFail(id)
        categoriaSuporte.merge(novaCategoriaSuporte)
        return await categoriaSuporte.save()
    }

    public async ativar(id: number) {
        let categoriaSuporte = await CategoriaSuporte.findOrFail(id)
        categoriaSuporte.ativo = !categoriaSuporte.ativo
        return await categoriaSuporte.save()
    }

}