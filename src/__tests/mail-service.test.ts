import { getEmailService } from '../services/email/service'

it('executes successfully', async () => {
	
	const to = 'myaccount@account.se'
	const content = {
		subject: 'myaccount@account.se',
		body:'mybodytext',
	}

	await getEmailService().send(to, content)
})
