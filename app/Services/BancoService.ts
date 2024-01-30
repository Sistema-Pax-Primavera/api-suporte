import Banco from "App/Models/Banco"

export default class BancoService {

    public async buscarTodos() {
        return await Banco.query()
    }

    public async buscarAtivos() {
        return await Banco.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Banco.findOrFail(id)
    }

    public async cadastrar(banco: any) {
        return await Banco.create(banco)
    }

    public async atualizar(novoBanco: any, id: number) {
        let banco = await Banco.findOrFail(id)
        banco.merge(novoBanco)
        return await banco.save()
    }

    public async ativar(id: number) {
        let banco = await Banco.findOrFail(id)
        banco.ativo = !banco.ativo
        return await banco.save()
    }

}