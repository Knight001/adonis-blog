 import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
 import { schema, rules } from '@ioc:Adonis/Core/Validator'
import Database from '@ioc:Adonis/Lucid/Database';
import User from "App/Models/User";
import auth from 'Config/auth';

export default class AuthController {
  public async registerShow({response,  view }: HttpContextContract) {
    if(!auth){
      return response.redirect('/')
    }
    //get users and paginate
    const users = await Database.from('users').paginate(1, 10)
    return view.render('auth/register', {
      title: "Users",
      users
    })
  }

  public async loginShow({ view }: HttpContextContract) {
    return view.render('auth/login', {
      title: "Login"
    })
  }

  public async register({ request, response, auth }: HttpContextContract) {
    // create validation schema for expected user form data
    const userSchema = schema.create({
      username: schema.string({ trim: true }, [rules.unique({ table: 'users', column: 'username', caseInsensitive: true })]),
      email: schema.string({ trim: true }, [rules.email(), rules.unique({ table: 'users', column: 'email', caseInsensitive: true })]),
      password: schema.string({}, [rules.minLength(8)])
    })

    const data = await request.validate({ schema: userSchema })

    // create a user record with the validated data
    const user = await User.create(data)

    // login the user using the user model record
    await auth.login(user)

    // redirect to the login page
    return response.redirect('/login')
  }

  public async login({ request, response, auth, session }: HttpContextContract) {
    // grab uid and password values off request body
    const { uid, password } = request.only(['uid', 'password'])

    try {
      // attempt to login
      await auth.attempt(uid, password)
    } catch (error) {
      // if login fails, return vague form message and redirect back
      session.flash('form', 'Your username, email, or password is incorrect')
      return response.redirect().back()
    }

    // otherwise, redirect to home page
    return response.redirect('/')
  }

  public async logout({ response, auth }: HttpContextContract) {
    // logout the user
    await auth.logout()

    // redirect to login page
    return response.redirect().toRoute('auth.login.show')
  }
}
