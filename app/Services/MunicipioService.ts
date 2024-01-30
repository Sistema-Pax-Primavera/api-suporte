import Municipio from "App/Models/Municipio"

export default class MunicipioService {

    public async buscarTodos() {
        return await Municipio.query()
    }

    public async buscarAtivos() {
        return await Municipio.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Municipio.findOrFail(id)
    }

    public async cadastrar(municipio: any) {
        return await Municipio.create(municipio)
    }

    public async atualizar(novoMunicipio: any, id: number) {
        let municipio = await Municipio.findOrFail(id)
        municipio.merge(novoMunicipio)
        return await municipio.save()
    }

    public async ativar(id: number) {
        let municipio = await Municipio.findOrFail(id)
        municipio.ativo = !municipio.ativo
        return await municipio.save()
    }

}