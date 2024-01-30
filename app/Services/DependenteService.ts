import Dependente from "App/Models/Dependente"

export default class DependenteService {

    public async buscarTodos() {
        return await Dependente.query()
    }

    public async buscarAtivos() {
        return await Dependente.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Dependente.findOrFail(id)
    }

    public async cadastrar(dependente: any) {
        return await Dependente.create(dependente)
    }

    public async atualizar(novoDependente: any, id: number) {
        let dependente = await Dependente.findOrFail(id)
        dependente.merge(novoDependente)
        return await dependente.save()
    }

    public async ativar(id: number) {
        let dependente = await Dependente.findOrFail(id)
        dependente.ativo = !dependente.ativo
        return await dependente.save()
    }

}