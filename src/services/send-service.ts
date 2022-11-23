import { SendService } from '../types'
import * as superagent from 'superagent'
import { getEnv } from '@helsingborg-stad/gdi-api-node'
import { v4 as uuidv4 } from 'uuid'

const getSendServiceFromEnv = (): SendService => getSendService(
	getEnv('EMAIL_PROXY_URL'),
	getEnv('EMAIL_PROXY_KEY'),
	getEnv('EMAIL_SENDER_ADRESS'),
	getEnv('EMAIL_SENDER_NAME'),
)

const getSendService = (proxyUrl: string, proxyKey: string, from: string, from_name: string): SendService => ({
	send: async (to, message) => {
		await superagent.post(proxyUrl)
			.send({
				jsonapi: {
					version: '1.0',
				},
				data: {
					type: 'text',
					id: uuidv4(),
					attributes: {
						to,
						from,
						from_name,
						subject: message.subject,
						message: message.body,
					},
				},
			})
			.set('X-API-Key', proxyKey)
			.set('accept', 'json')
	},
})

export { getSendService, getSendServiceFromEnv }