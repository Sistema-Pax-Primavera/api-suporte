import CustomError from "App/Exceptions/CustomError"
import DescontoRegra from "App/Models/DescontoRegra"
import CrudDatabase from "App/Utils/CrudDatabase"
import validateFields from "App/Utils/Functions"
import { FieldOptions, operadores } from "App/Utils/Globals"

interface DescontoRegraInterface {
    [key: string]: FieldOptions
}

const fields: DescontoRegraInterface = {
    tipo: { type: 'number', required: true },
    quantidade: { type: 'number', required: true },
    operador: { type: 'string', required: true, enumValues: operadores },
    desconto: { type: 'number', required: true, format: '0.00' },
    ativo: { type: 'boolean', required: false, default: true },
    createdBy: { type: 'string', required: true },
    createdAt: { type: 'datetime', required: false, format: 'yyyy-MM-dd HH:mm:ss' },
    updatedBy: { type: 'string', required: false },
    updatedAt: { type: 'datetime', required: false, format: 'yyyy-MM-dd HH:mm:ss' }
}

export default class DescontoRegraService {
    serviceDatabase = new CrudDatabase(DescontoRegra)

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