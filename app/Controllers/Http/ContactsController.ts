// import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

export default class ContactsController {
  async index({view}){

    return view.render("common.contact",{title: "Your Feedback is greatly appreciated"});
  }
}
