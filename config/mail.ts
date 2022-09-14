import { mailConfig } from '@adonisjs/mail/build/config'
import Env from '@ioc:Adonis/Core/Env'

export default mailConfig({
  mailer: 'mailgun',
  mailers: {
    mailgun: {
      driver: 'mailgun',
      baseUrl: 'https://api.mailgun.net/v3',
      key: Env.get('MAILGUN_API_KEY'),
      domain: Env.get('MAILGUN_DOMAIN'),
    },

    smtp: {
      driver: 'smtp',
      host: Env.get('SMTP_HOST') as string,
      port: Env.get('SMTP_PORT') as string,
    },
  },
})
