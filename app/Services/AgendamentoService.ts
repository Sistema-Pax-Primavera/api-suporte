import Agendamento from "App/Models/Agendamento"

export default class AgendamentoService {

    public async buscarTodos() {
        return await Agendamento.query()
    }

    public async buscarAtivos() {
        return await Agendamento.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Agendamento.findOrFail(id)
    }

    public async cadastrar(agendamento: any) {
        return await Agendamento.create(agendamento)
    }

    public async atualizar(novoAgendamento: any, id: number) {
        let agendamento = await Agendamento.findOrFail(id)
        agendamento.merge(novoAgendamento)
        return await agendamento.save()
    }

    public async ativar(id: number) {
        let agendamento = await Agendamento.findOrFail(id)
        agendamento.ativo = !agendamento.ativo
        return await agendamento.save()
    }

}