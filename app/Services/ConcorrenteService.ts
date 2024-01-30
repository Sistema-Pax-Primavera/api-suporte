import Concorrente from "App/Models/Concorrente"

export default class ConcorrenteService {

    public async buscarTodos() {
        return await Concorrente.query()
    }

    public async buscarAtivos() {
        return await Concorrente.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Concorrente.findOrFail(id)
    }

    public async cadastrar(concorrente: any) {
        return await Concorrente.create(concorrente)
    }

    public async atualizar(novaConcorrente: any, id: number) {
        let concorrente = await Concorrente.findOrFail(id)
        concorrente.merge(novaConcorrente)
        return await concorrente.save()
    }

    public async ativar(id: number) {
        let concorrente = await Concorrente.findOrFail(id)
        concorrente.ativo = !concorrente.ativo
        return await concorrente.save()
    }

}