import EstadoCivil from "App/Models/EstadoCivil"

export default class EstadoCivilService {

    public async buscarTodos() {
        return await EstadoCivil.query()
    }

    public async buscarAtivos() {
        return await EstadoCivil.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await EstadoCivil.findOrFail(id)
    }

    public async cadastrar(estadoCivil: any) {
        return await EstadoCivil.create(estadoCivil)
    }

    public async atualizar(novoEstadoCivil: any, id: number) {
        let estadoCivil = await EstadoCivil.findOrFail(id)
        estadoCivil.merge(novoEstadoCivil)
        return await estadoCivil.save()
    }

    public async ativar(id: number) {
        let estadoCivil = await EstadoCivil.findOrFail(id)
        estadoCivil.ativo = !estadoCivil.ativo
        return await estadoCivil.save()
    }

}