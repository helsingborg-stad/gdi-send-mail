import { getEnv } from '@helsingborg-stad/gdi-api-node'
import * as superagent from 'superagent'
import { v4 as uuidv4 } from 'uuid'
import { MailContent } from '../../../types'
import { EmailSendProvider } from '../service'

export interface EmailSendParams {
	proxyUrl: string;
	proxyKey: string;
	address: string;
	name: string;
}

const send = async (params: EmailSendParams, to: string, message: MailContent): Promise<void> => {
	await superagent.post(params.proxyUrl)
		.send({
			jsonapi: {
				version: '1.0',
			},
			data: {
				type: 'text',
				id: uuidv4(),
				attributes: {
					to,
					from: params.address,
					from_name: params.name,
					subject: message.subject,
					message: message.body,
				},
			},
		})
		.set('X-API-Key', params.proxyKey)
		.set('accept', 'json')
}

export const tryCreateHelsingborgFromEnv = (): EmailSendProvider => {
	if (getEnv('EMAIL_PROVIDER', { fallback: '' }) !== 'helsingborg') {
		return null
	}
	const params = {
		proxyUrl: getEnv('EMAIL_PROXY_URL'),
		proxyKey: getEnv('EMAIL_PROXY_KEY'),
		address: getEnv('EMAIL_SENDER_ADRESS'),
		name: getEnv('EMAIL_SENDER_NAME'),
	}
	return async (to, message) => send(params, to, message)
}
