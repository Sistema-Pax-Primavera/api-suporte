import Especie from "App/Models/Especie"

export default class EspecieService {

    public async buscarTodos() {
        return await Especie.query()
    }

    public async buscarAtivos() {
        return await Especie.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Especie.findOrFail(id)
    }

    public async cadastrar(especie: any) {
        return await Especie.create(especie)
    }

    public async atualizar(novaEspecie: any, id: number) {
        let especie = await Especie.findOrFail(id)
        especie.merge(novaEspecie)
        return await especie.save()
    }

    public async ativar(id: number) {
        let especie = await Especie.findOrFail(id)
        especie.ativo = !especie.ativo
        return await especie.save()
    }

}