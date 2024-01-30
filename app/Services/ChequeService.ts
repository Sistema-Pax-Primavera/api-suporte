import Cheque from "App/Models/Cheque"

export default class ChequeService {

    public async buscarTodos() {
        return await Cheque.query()
    }

    public async buscarAtivos() {
        return await Cheque.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Cheque.findOrFail(id)
    }

    public async cadastrar(cheque: any) {
        return await Cheque.create(cheque)
    }

    public async atualizar(novoCheque: any, id: number) {
        let cheque = await Cheque.findOrFail(id)
        cheque.merge(novoCheque)
        return await cheque.save()
    }

    public async ativar(id: number) {
        let cheque = await Cheque.findOrFail(id)
        cheque.ativo = !cheque.ativo
        return await cheque.save()
    }

}