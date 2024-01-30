import Plano from "App/Models/Plano"

export default class PlanoService {

    public async buscarTodos() {
        return await Plano.query()
    }

    public async buscarAtivos() {
        return await Plano.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Plano.findOrFail(id)
    }

    public async cadastrar(plano: any) {
        return await Plano.create(plano)
    }

    public async atualizar(novoPlano: any, id: number) {
        let plano = await Plano.findOrFail(id)
        plano.merge(novoPlano)
        return await plano.save()
    }

    public async ativar(id: number) {
        let plano = await Plano.findOrFail(id)
        plano.ativo = !plano.ativo
        return await plano.save()
    }

}