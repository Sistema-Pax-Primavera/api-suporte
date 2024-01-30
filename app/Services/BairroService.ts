import Bairro from "App/Models/Bairro"

export default class BairroService {

    public async buscarTodos() {
        return await Bairro.query()
    }

    public async buscarAtivos() {
        return await Bairro.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Bairro.findOrFail(id)
    }

    public async cadastrar(bairro: any) {
        return await Bairro.create(bairro)
    }

    public async atualizar(novoBairro: any, id: number) {
        let bairro = await Bairro.findOrFail(id)
        bairro.merge(novoBairro)
        return await bairro.save()
    }

    public async ativar(id: number) {
        let bairro = await Bairro.findOrFail(id)
        bairro.ativo = !bairro.ativo
        return await bairro.save()
    }

}