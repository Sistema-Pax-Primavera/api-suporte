import CustomError from "App/Exceptions/CustomError"
import Adicional from "App/Models/Adicional"
import CrudDatabase from "App/Utils/CrudDatabase"
import validateFields from "App/Utils/Functions"
import { FieldOptions, portes } from "App/Utils/Globals"

interface AdicionalInterface {
    [key: string]: FieldOptions
}

const adicionalFields: AdicionalInterface = {
    descricao: { type: 'string', required: true, unique: true },
    pet: { type: 'boolean', required: true, default: false },
    porte: { type: 'string', required: false, enumValues: portes },
    resgate: { type: 'boolean', required: false, default: true },
    ativo: { type: 'boolean', required: false, default: true },
    createdBy: { type: 'string', required: true },
    createdAt: { type: 'datetime', required: false, format: 'yyyy-MM-dd HH:mm:ss' },
    updatedBy: { type: 'string', required: false },
    updatedAt: { type: 'datetime', required: false, format: 'yyyy-MM-dd HH:mm:ss' }
}

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

    public async cadastrar(data: object) {
        data["createdBy"] = 'ADMIN'
        
        const verify = await validateFields(data, adicionalFields, this.serviceDatabase)
        if (!verify["status"]) throw new CustomError(verify["message"], 404)

        return await this.serviceDatabase.insert(data)
    }

    public async atualizar(data: object, id: number) {
        data["createdBy"] = 'ADMIN'
        adicionalFields["updatedBy"].required = true
        
        const verify = await validateFields(data, adicionalFields, this.serviceDatabase)
        if (!verify["status"]) throw new CustomError(verify["message"], 404)

        return await this.serviceDatabase.update(id, data)
    }

    public async ativar(id: number) {
        return await this.serviceDatabase.activate(id)
    }

}