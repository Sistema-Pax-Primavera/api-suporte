import CustomError from "App/Exceptions/CustomError"
import Conta from "App/Models/Conta"
import CrudDatabase from "App/Utils/CrudDatabase"
import validateFields from "App/Utils/Functions"
import { FieldOptions, tipoConta, tipoContaBancaria } from "App/Utils/Globals"

interface ContaInterface {
    [key: string]: FieldOptions
}

const fields: ContaInterface = {
    unidadeId: { type: 'number', required: false },
    bancoId: { type: 'number', required: false },
    descricao: { type: 'string', required: true },
    agencia: { type: 'number', required: false },
    digitoAgencia: { type: 'number', required: false },
    conta: { type: 'number', required: false },
    digitoConta: { type: 'number', required: false },
    tipoContaBancaria: { type: 'number', required: false, enumValues: tipoContaBancaria },
    tipo: { type: 'string', required: true, enumValues: tipoConta },
    ativo: { type: 'boolean', required: false, default: true },
    createdBy: { type: 'string', required: true },
    createdAt: { type: 'datetime', required: false, format: 'yyyy-MM-dd HH:mm:ss' },
    updatedBy: { type: 'string', required: false },
    updatedAt: { type: 'datetime', required: false, format: 'yyyy-MM-dd HH:mm:ss' }
}

export default class ContaService {
    serviceDatabase = new CrudDatabase(Conta)

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