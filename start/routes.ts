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
| import './routes/customer''
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('delete/:id', "PostsController.delete");
  Route.post("posts", "PostsController.store");
  Route.post("posts/:id", "PostsController.update");
  Route.post("categories", "CategoriesController.store");
  Route.get('logout', 'AuthController.logout').as('auth.logout')
  Route.get('users', 'AuthController.registerShow').as('auth.register.show')
  Route.post('register', 'AuthController.register').as('auth.register')
}).middleware(["auth"]);

Route.get('/', "PostsController.index")
Route.get('/posts', "PostsController.index")
Route.get('posts/:slug', 'PostsController.show');



Route.get('/about', "AboutsController.index")

Route.get('/contact', "ContactsController.index")


Route.get('/categories', "CategoriesController.index")

Route.post('login', 'AuthController.login').as('auth.login')
Route.get('login', 'AuthController.loginShow').as('auth.login.show')

