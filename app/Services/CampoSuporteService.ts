import CampoSuporte from "App/Models/CampoSuporte"

export default class CampoSuporteService {

    public async buscarTodos() {
        return await CampoSuporte.query()
    }

    public async buscarAtivos() {
        return await CampoSuporte.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await CampoSuporte.findOrFail(id)
    }

    public async cadastrar(campoSuporte: any) {
        return await CampoSuporte.create(campoSuporte)
    }

    public async atualizar(novoCampoSuporte: any, id: number) {
        let campoSuporte = await CampoSuporte.findOrFail(id)
        campoSuporte.merge(novoCampoSuporte)
        return await campoSuporte.save()
    }

    public async ativar(id: number) {
        let campoSuporte = await CampoSuporte.findOrFail(id)
        campoSuporte.ativo = !campoSuporte.ativo
        return await campoSuporte.save()
    }

}