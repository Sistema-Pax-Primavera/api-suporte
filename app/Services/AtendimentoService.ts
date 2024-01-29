import Atendimento from "App/Models/Atendimento"

export default class AtendimentoService {

    public async buscarTodos() {
        return await Atendimento.query()
    }

    public async buscarAtivos() {
        return await Atendimento.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Atendimento.findOrFail(id)
    }

    public async cadastrar(atendimento: any) {
        return await Atendimento.create(atendimento)
    }

    public async atualizar(novoAtendimento: any, id: number) {
        let atendimento = await Atendimento.findOrFail(id)
        atendimento.merge(novoAtendimento)
        return await atendimento.save()
    }

    public async ativar(id: number) {
        let atendimento = await Atendimento.findOrFail(id)
        atendimento.ativo = !atendimento.ativo
        return await atendimento.save()
    }

}