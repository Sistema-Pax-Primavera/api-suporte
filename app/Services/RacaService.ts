import Raca from "App/Models/Raca"

export default class RacaService {

    public async buscarTodos() {
        return await Raca.query()
    }

    public async buscarAtivos() {
        return await Raca.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Raca.findOrFail(id)
    }

    public async cadastrar(raca: any) {
        return await Raca.create(raca)
    }

    public async atualizar(novaRaca: any, id: number) {
        let raca = await Raca.findOrFail(id)
        raca.merge(novaRaca)
        return await raca.save()
    }

    public async ativar(id: number) {
        let raca = await Raca.findOrFail(id)
        raca.ativo = !raca.ativo
        return await raca.save()
    }

}