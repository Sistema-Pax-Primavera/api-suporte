import CustomError from "App/Exceptions/CustomError"
import AdicionalUnidade from "App/Models/AdicionalUnidade"
import CrudDatabase from "App/Utils/CrudDatabase"
import validateFields from "App/Utils/Functions"
import { FieldOptions } from "App/Utils/Globals"

interface AdicionalUnidadeInterface {
    [key: string]: FieldOptions
}

const fields: AdicionalUnidadeInterface = {
    adicionalId: { type:'number', required: true },
    unidadeId: { type:'number', required: true },
    valorAdesao: { type:'number', required: true, format: '0.00' },
    valorMensalidade: { type:'number', required: true, format: '0.00' },
    carenciaNovo: { type:'number', required: true, format: '0.00' },
    carenciaAtraso: { type:'number', required: true, format: '0.00' },
    ativo: { type: 'boolean', required: false, default: true },
    createdBy: { type: 'string', required: true },
    createdAt: { type: 'datetime', required: false, format: 'yyyy-MM-dd HH:mm:ss' },
    updatedBy: { type: 'string', required: false },
    updatedAt: { type: 'datetime', required: false, format: 'yyyy-MM-dd HH:mm:ss' }
}

export default class AdicionalUnidadeService {
    serviceDatabase = new CrudDatabase(AdicionalUnidade)

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
        
        const verify = await validateFields(data, fields, this.serviceDatabase)
        if (!verify["status"]) throw new CustomError(verify["message"], 404)

        return await this.serviceDatabase.insert(data)
    }

    public async atualizar(data: object, id: number) {
        data["createdBy"] = 'ADMIN'
        fields["updatedBy"].required = true
        
        const verify = await validateFields(data, fields, this.serviceDatabase)
        if (!verify["status"]) throw new CustomError(verify["message"], 404)

        return await this.serviceDatabase.update(id, data)
    }

    public async ativar(id: number) {
        return await this.serviceDatabase.activate(id)
    }

}