import DescontoRegra from "App/Models/DescontoRegra"

export default class DescontoRegraService {

    public async buscarTodos() {
        return await DescontoRegra.query()
    }

    public async buscarAtivos() {
        return await DescontoRegra.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await DescontoRegra.findOrFail(id)
    }

    public async cadastrar(descontoRegra: any) {
        return await DescontoRegra.create(descontoRegra)
    }

    public async atualizar(novoDescontoRegra: any, id: number) {
        let descontoRegra = await DescontoRegra.findOrFail(id)
        descontoRegra.merge(novoDescontoRegra)
        return await descontoRegra.save()
    }

    public async ativar(id: number) {
        let descontoRegra = await DescontoRegra.findOrFail(id)
        descontoRegra.ativo = !descontoRegra.ativo
        return await descontoRegra.save()
    }

}