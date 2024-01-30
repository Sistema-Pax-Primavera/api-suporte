import Religiao from "App/Models/Religiao"

export default class ReligiaoService {

    public async buscarTodos() {
        return await Religiao.query()
    }

    public async buscarAtivos() {
        return await Religiao.query().where({ "ativo": true })
    }

    public async buscarPorId(id: number) {
        return await Religiao.findOrFail(id)
    }

    public async cadastrar(religiao: any) {
        return await Religiao.create(religiao)
    }

    public async atualizar(novaReligiao: any, id: number) {
        let religiao = await Religiao.findOrFail(id)
        religiao.merge(novaReligiao)
        return await religiao.save()
    }

    public async ativar(id: number) {
        let religiao = await Religiao.findOrFail(id)
        religiao.ativo = !religiao.ativo
        return await religiao.save()
    }

}