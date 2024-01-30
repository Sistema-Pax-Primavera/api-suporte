import PlanoConta from "App/Models/PlanoConta"

export default class PlanoContaService {

    public async buscarTodos() {
        return await PlanoConta.query()
    }

    public async buscarAtivos() {
        return await PlanoConta.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await PlanoConta.findOrFail(id)
    }

    public async cadastrar(planoConta: any) {
        return await PlanoConta.create(planoConta)
    }

    public async atualizar(novoPlanoConta: any, id: number) {
        let planoConta = await PlanoConta.findOrFail(id)
        planoConta.merge(novoPlanoConta)
        return await planoConta.save()
    }

    public async ativar(id: number) {
        let planoConta = await PlanoConta.findOrFail(id)
        planoConta.ativo = !planoConta.ativo
        return await planoConta.save()
    }

}