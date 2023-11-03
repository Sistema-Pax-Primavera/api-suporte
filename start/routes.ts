/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.post('api/v1/usuario/login', 'UsuarioController.autenticar')

Route.group(() => {
  Route.post('', 'ModuloController.cadastrar')
  Route.put(':id', 'ModuloController.atualizar')
  Route.patch(':id', 'ModuloController.ativar')
  Route.get('', 'ModuloController.buscarTodos')
  Route.get('ativos', 'ModuloController.buscarAtivos')
  Route.get(':id', 'ModuloController.buscarPorId')
}).prefix('api/v1/modulo').middleware(['auth'])

Route.group(() => {
  Route.post('', 'UnidadeController.cadastrar')
  Route.put(':id', 'UnidadeController.atualizar')
  Route.patch(':id', 'UnidadeController.ativar')
  Route.get('', 'UnidadeController.buscarTodos')
  Route.get('ativos', 'UnidadeController.buscarAtivos')
  Route.get(':id', 'UnidadeController.buscarPorId')
}).prefix('api/v1/unidade').middleware(['auth'])

Route.group(() => {
  Route.post('', 'FuncaoController.cadastrar')
  Route.put(':id', 'FuncaoController.atualizar')
  Route.patch(':id', 'FuncaoController.ativar')
  Route.get('', 'FuncaoController.buscarTodos')
  Route.get('ativos', 'FuncaoController.buscarAtivos')
  Route.get(':id', 'FuncaoController.buscarPorId')
}).prefix('api/v1/funcao').middleware(['auth'])

Route.group(() => {
  Route.post('', 'SetorController.cadastrar')
  Route.put(':id', 'SetorController.atualizar')
  Route.patch(':id', 'SetorController.ativar')
  Route.get('', 'SetorController.buscarTodos')
  Route.get('ativos', 'SetorController.buscarAtivos')
  Route.get(':id', 'SetorController.buscarPorId')
}).prefix('api/v1/setor').middleware(['auth'])

Route.group(() => {
  Route.post('', 'UsuarioController.cadastrar')
  Route.put(':id', 'UsuarioController.atualizar')
  Route.patch(':id', 'UsuarioController.ativar')
  Route.get('', 'UsuarioController.buscarTodos')
  Route.get('ativos', 'UsuarioController.buscarAtivos')
  Route.get(':id', 'UsuarioController.buscarPorId')
}).prefix('api/v1/usuario').middleware(['auth'])

Route.group(() => {
  Route.post('', 'RegiaoController.cadastrar')
  Route.put(':id', 'RegiaoController.atualizar')
  Route.patch(':id', 'RegiaoController.ativar')
  Route.get('', 'RegiaoController.buscarTodos')
  Route.get('ativos', 'RegiaoController.buscarAtivos')
  Route.get(':id', 'RegiaoController.buscarPorId')
}).prefix('api/v1/regiao').middleware(['auth'])

Route.group(() => {
  Route.post('', 'PlanoController.cadastrar')
  Route.put(':id', 'PlanoController.atualizar')
  Route.patch(':id', 'PlanoController.ativar')
  Route.get('', 'PlanoController.buscarTodos')
  Route.get('ativos', 'PlanoController.buscarAtivos')
  Route.get(':id', 'PlanoController.buscarPorId')
}).prefix('api/v1/plano').middleware(['auth'])

Route.group(() => {
  Route.post('', 'EstadoCivilController.cadastrar')
  Route.put(':id', 'EstadoCivilController.atualizar')
  Route.patch(':id', 'EstadoCivilController.ativar')
  Route.get('', 'EstadoCivilController.buscarTodos')
  Route.get('ativos', 'EstadoCivilController.buscarAtivos')
  Route.get(':id', 'EstadoCivilController.buscarPorId')
}).prefix('api/v1/estadocivil').middleware(['auth'])

Route.group(() => {
  Route.post('', 'ReligiaoController.cadastrar')
  Route.put(':id', 'ReligiaoController.atualizar')
  Route.patch(':id', 'ReligiaoController.ativar')
  Route.get('', 'ReligiaoController.buscarTodos')
  Route.get('ativos', 'ReligiaoController.buscarAtivos')
  Route.get(':id', 'ReligiaoController.buscarPorId')
}).prefix('api/v1/religiao').middleware(['auth'])

Route.group(() => {
  Route.post('', 'MunicipioController.cadastrar')
  Route.put(':id', 'MunicipioController.atualizar')
  Route.patch(':id', 'MunicipioController.ativar')
  Route.get('', 'MunicipioController.buscarTodos')
  Route.get('ativos', 'MunicipioController.buscarAtivos')
  Route.get(':id', 'MunicipioController.buscarPorId')
}).prefix('api/v1/municipio').middleware(['auth'])

Route.group(() => {
  Route.post('', 'RegiaoBairroController.cadastrar')
  Route.put(':id', 'RegiaoBairroController.atualizar')
  Route.patch(':id', 'RegiaoBairroController.ativar')
  Route.get('', 'RegiaoBairroController.buscarTodos')
  Route.get('ativos', 'RegiaoBairroController.buscarAtivos')
  Route.get(':id', 'RegiaoBairroController.buscarPorId')
}).prefix('api/v1/regiaobairro').middleware(['auth'])

Route.group(() => {
  Route.post('', 'BairroController.cadastrar')
  Route.put(':id', 'BairroController.atualizar')
  Route.patch(':id', 'BairroController.ativar')
  Route.get('', 'BairroController.buscarTodos')
  Route.get('ativos', 'BairroController.buscarAtivos')
  Route.get(':id', 'BairroController.buscarPorId')
}).prefix('api/v1/bairro').middleware(['auth'])

Route.group(() => {
  Route.post('', 'RotaController.cadastrar')
  Route.put(':id', 'RotaController.atualizar')
  Route.patch(':id', 'RotaController.ativar')
  Route.get('', 'RotaController.buscarTodos')
  Route.get('ativos', 'RotaController.buscarAtivos')
  Route.get(':id', 'RotaController.buscarPorId')
}).prefix('api/v1/rota').middleware(['auth'])

Route.group(() => {
  Route.post('', 'ConcorrenteController.cadastrar')
  Route.put(':id', 'ConcorrenteController.atualizar')
  Route.patch(':id', 'ConcorrenteController.ativar')
  Route.get('', 'ConcorrenteController.buscarTodos')
  Route.get('ativos', 'ConcorrenteController.buscarAtivos')
  Route.get(':id', 'ConcorrenteController.buscarPorId')
}).prefix('api/v1/concorrente').middleware(['auth'])

Route.group(() => {
  Route.post('', 'SituacaoController.cadastrar')
  Route.put(':id', 'SituacaoController.atualizar')
  Route.patch(':id', 'SituacaoController.ativar')
  Route.get('', 'SituacaoController.buscarTodos')
  Route.get('ativos', 'SituacaoController.buscarAtivos')
  Route.get(':id', 'SituacaoController.buscarPorId')
}).prefix('api/v1/situacao').middleware(['auth'])

Route.group(() => {
  Route.post('', 'AdicionalController.cadastrar')
  Route.put(':id', 'AdicionalController.atualizar')
  Route.patch(':id', 'AdicionalController.ativar')
  Route.get('', 'AdicionalController.buscarTodos')
  Route.get('ativos', 'AdicionalController.buscarAtivos')
  Route.get(':id', 'AdicionalController.buscarPorId')
}).prefix('api/v1/adicional').middleware(['auth'])

Route.group(() => {
  Route.post('', 'TipoAtendimentoController.cadastrar')
  Route.put(':id', 'TipoAtendimentoController.atualizar')
  Route.patch(':id', 'TipoAtendimentoController.ativar')
  Route.get('', 'TipoAtendimentoController.buscarTodos')
  Route.get('ativos', 'TipoAtendimentoController.buscarAtivos')
  Route.get(':id', 'TipoAtendimentoController.buscarPorId')
}).prefix('api/v1/tipoatendimento').middleware(['auth'])

Route.group(() => {
  Route.post('', 'SubTipoAtendimentoController.cadastrar')
  Route.put(':id', 'SubTipoAtendimentoController.atualizar')
  Route.patch(':id', 'SubTipoAtendimentoController.ativar')
  Route.get('', 'SubTipoAtendimentoController.buscarTodos')
  Route.get('ativos', 'SubTipoAtendimentoController.buscarAtivos')
  Route.get(':id', 'SubTipoAtendimentoController.buscarPorId')
}).prefix('api/v1/subtipoatendimento').middleware(['auth'])

Route.group(() => {
  Route.post('', 'ParentescoController.cadastrar')
  Route.put(':id', 'ParentescoController.atualizar')
  Route.patch(':id', 'ParentescoController.ativar')
  Route.get('', 'ParentescoController.buscarTodos')
  Route.get('ativos', 'ParentescoController.buscarAtivos')
  Route.get(':id', 'ParentescoController.buscarPorId')
}).prefix('api/v1/parentesco').middleware(['auth'])

Route.group(() => {
  Route.post('', 'EspecieController.cadastrar')
  Route.put(':id', 'EspecieController.atualizar')
  Route.patch(':id', 'EspecieController.ativar')
  Route.get('', 'EspecieController.buscarTodos')
  Route.get('ativos', 'EspecieController.buscarAtivos')
  Route.get(':id', 'EspecieController.buscarPorId')
}).prefix('api/v1/especie').middleware(['auth'])



