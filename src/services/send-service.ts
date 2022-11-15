import { SendService } from '../types'
import * as superagent from 'superagent'
import { getEnv } from '@helsingborg-stad/gdi-api-node'
import { v4 as uuidv4 } from 'uuid'

const getSendServiceFromEnv = (): SendService => getSendService(
	getEnv('EMAIL_PROXY_URL'),
	getEnv('EMAIL_PROXY_KEY')
)

const getSendService = (proxyUrl: string, proxyKey: string): SendService => ({
	send: async ({ receiver, message }) => {
		const body = {
			jsonapi: {
				version: '1.0',
			},
			data: {
				type: 'email',
				id: uuidv4(),
				attributes: {
					receiver,
					message,
				},
			},
		}

		await superagent.post(proxyUrl)
			.send(body)
			.set('X-API-Key', proxyKey)
			.set('accept', 'json')
	},
})

export { getSendService, getSendServiceFromEnv }