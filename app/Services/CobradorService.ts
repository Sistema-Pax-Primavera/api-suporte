import Cobrador from "App/Models/Cobrador"

export default class CobradorService {

    public async buscarTodos() {
        return await Cobrador.query()
    }

    public async buscarAtivos() {
        return await Cobrador.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Cobrador.findOrFail(id)
    }

    public async cadastrar(cobrador: any) {
        return await Cobrador.create(cobrador)
    }

    public async atualizar(novoCobrador: any, id: number) {
        let cobrador = await Cobrador.findOrFail(id)
        cobrador.merge(novoCobrador)
        return await cobrador.save()
    }

    public async ativar(id: number) {
        let cobrador = await Cobrador.findOrFail(id)
        cobrador.ativo = !cobrador.ativo
        return await cobrador.save()
    }

}