import Cobrador from "App/Models/Cobrador"
import CrudDatabase from "App/Utils/CrudDatabase"

export default class CobradorService {
    serviceDatabase = new CrudDatabase(Cobrador)

    public async buscarTodos() {
        return await this.serviceDatabase.findAll()
    }

    public async buscarAtivos() {
        return await this.serviceDatabase.findByFilter({ ativo: true })
    }

    public async buscarPorId(id: number) {
        return await this.serviceDatabase.findById(id)
    }

    public async cadastrar(data: any) {
        return await this.serviceDatabase.insert(data)
    }

    public async atualizar(data: any, id: number) {
        return await this.serviceDatabase.update(id, data)
    }

    public async ativar(id: number) {
        return await this.serviceDatabase.activate(id)
    }

}