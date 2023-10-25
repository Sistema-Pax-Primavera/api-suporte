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