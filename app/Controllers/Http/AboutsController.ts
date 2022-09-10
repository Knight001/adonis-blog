// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class AboutsController {
  async index({view}){

    return view.render("common.about",{title: "Who Are We"});
  }
}
