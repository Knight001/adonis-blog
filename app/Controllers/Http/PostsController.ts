// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Category from "App/Models/Category";
import Post from "App/Models/Post";
import Application from '@ioc:Adonis/Core/Application'
import Env from '@ioc:Adonis/Core/Env'
import Database from '@ioc:Adonis/Lucid/Database'
import { Exception } from "@adonisjs/core/build/standalone";
var he = require('he');


export default class PostsController {
  async index({request, view}){
    const page = request.input('page', 1)
    const limit = request.input('limit', 10)
    const posts = await Database.from('posts').orderBy('id', 'desc').paginate(page, limit)
    const categories = await Category.all();
    posts.baseUrl('/')
    return view.render("posts.index",{
      posts: posts,
      categories: categories,
      title: "Latest Blog Posts",
      he

    });
  }

  public async store({request, response}){

    const coverImage = request.file('image', {
      size: '2mb',
      extnames: ['jpg', 'png', 'gif'],
    })
    if (!coverImage) {
      return
    }
    if (!coverImage.isValid) {
      return coverImage.errors
    }
    await coverImage.move(Application.publicPath('uploads'),{
      name: `${new Date().getTime()}.${coverImage.extname}`
    })
    const baseurl=  Env.get('BASE_URL');
    try {

      let post = new Post();
      const title = request.input('title');
      post.title = title;
      post.slug = new Date().getTime().toString();
      post.body = he.encode(request.input('body'));
      post.category_id = +request.input('category')
      post.image = baseurl+'/uploads/'+coverImage.fileName;
      await post.save();
      return response.redirect('/');
    } catch (e) {
      throw new Exception(e, 500)
    }

  }


  public async show({params, view}){

    const posts = await Database.from('posts').paginate(1, 5);
    const post = await Post.query().where('slug', params.slug).first()
    const categories = await Category.all();
    return view.render('posts.show', {
      post,
      posts,
      he,
      categories: categories,
      title: "Single Post"
    })
  }


  async update({params, request, response}){
    const post = await Post.findOrFail(params.id);
    post.title = request.input('title');
    post.category_id = request.input('category');
    post.body = request.input('body');
    await post.save()
    return response.redirect(`/posts/${post.slug}`);

  }

  async delete({params, request, response}){
    const user = await Post.findOrFail(params.id)
    await user.delete()
    return response.redirect('/');
  }

}
