import Parentesco from "App/Models/Parentesco"

export default class ParentescoService {

    public async buscarTodos() {
        return await Parentesco.query()
    }

    public async buscarAtivos() {
        return await Parentesco.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Parentesco.findOrFail(id)
    }

    public async cadastrar(parentesco: any) {
        return await Parentesco.create(parentesco)
    }

    public async atualizar(novoParentesco: any, id: number) {
        let parentesco = await Parentesco.findOrFail(id)
        parentesco.merge(novoParentesco)
        return await parentesco.save()
    }

    public async ativar(id: number) {
        let parentesco = await Parentesco.findOrFail(id)
        parentesco.ativo = !parentesco.ativo
        return await parentesco.save()
    }

}