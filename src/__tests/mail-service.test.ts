import { getEmailService } from '../services/email/service'

it('returns a templated string with an injected verificationcode', async () => {
	
	const to = 'myaccount@account.se'
	const content = {
		subject: 'myaccount@account.se',
		body:'mybodytext',
	}

	await getEmailService().send(to, content)
})
