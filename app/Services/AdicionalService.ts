import Adicional from "App/Models/Adicional"
import CrudDatabase from "App/Utils/CrudDatabase"

export default class AdicionalService {
    serviceDatabase = new CrudDatabase(Adicional)

    public async buscarTodos() {
        return await this.serviceDatabase.findAll()
    }

    public async buscarAtivos() {
        return await this.serviceDatabase.findByFilter({ ativo: true })
    }

    public async buscarPorId(id: number) {
        return await this.serviceDatabase.findById(id)
    }

    public async cadastrar(adicional: any) {
        return await this.serviceDatabase.insert(adicional)
    }

    public async atualizar(novoAdicional: any, id: number) {
        return await this.serviceDatabase.update(id, novoAdicional)
    }

    public async ativar(id: number) {
        return await this.serviceDatabase.activate(id)
    }

}