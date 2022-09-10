 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Category from 'App/Models/Category'
import Post from 'App/Models/Post'

export default class CategoriesController {
  public async index({view}: HttpContextContract){
    const categories = await Category.all();
     const post = await Post.firstOrNew
    return view.render('categories.index',{
      categories: categories,
      posts: post,
      title: "Categories List",
    })

  }


  public async store({request, response}){
    const category = new Category();
    category.name = request.input("name");
    await category.save();
    return response.redirect("/categories");
  }
}
