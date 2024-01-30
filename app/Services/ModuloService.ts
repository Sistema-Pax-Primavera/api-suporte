import Modulo from "App/Models/Modulo"

export default class ModuloService {

    public async buscarTodos() {
        return await Modulo.query()
    }

    public async buscarAtivos() {
        return await Modulo.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Modulo.findOrFail(id)
    }

    public async cadastrar(modulo: any) {
        return await Modulo.create(modulo)
    }

    public async atualizar(novoModulo: any, id: number) {
        let modulo = await Modulo.findOrFail(id)
        modulo.merge(novoModulo)
        return await modulo.save()
    }

    public async ativar(id: number) {
        let modulo = await Modulo.findOrFail(id)
        modulo.ativo = !modulo.ativo
        return await modulo.save()
    }

}