import Rota from "App/Models/Rota"

export default class RotaService {

    public async buscarTodos() {
        return await Rota.query()
    }

    public async buscarAtivos() {
        return await Rota.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Rota.findOrFail(id)
    }

    public async cadastrar(rota: any) {
        return await Rota.create(rota)
    }

    public async atualizar(novaRota: any, id: number) {
        let rota = await Rota.findOrFail(id)
        rota.merge(novaRota)
        return await rota.save()
    }

    public async ativar(id: number) {
        let rota = await Rota.findOrFail(id)
        rota.ativo = !rota.ativo
        return await rota.save()
    }

}