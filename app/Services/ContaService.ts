import Conta from "App/Models/Conta"

export default class ContaService {

    public async buscarTodos() {
        return await Conta.query()
    }

    public async buscarAtivos() {
        return await Conta.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Conta.findOrFail(id)
    }

    public async cadastrar(conta: any) {
        return await Conta.create(conta)
    }

    public async atualizar(novaConta: any, id: number) {
        let conta = await Conta.findOrFail(id)
        conta.merge(novaConta)
        return await conta.save()
    }

    public async ativar(id: number) {
        let conta = await Conta.findOrFail(id)
        conta.ativo = !conta.ativo
        return await conta.save()
    }

}