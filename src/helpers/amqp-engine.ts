
import * as amqp from 'amqplib'
import { MqEngine, MqMessageEnvelope } from '../types'

const createAmqpEngine = (): MqEngine => {
	let connection: amqp.Connection
	let channel: amqp.Channel
	
	return {
		async connect(uri: string): Promise<void> {
			connection = await amqp.connect(uri)
		},
		async createChannel(): Promise<void> {
			channel = await connection.createChannel() 
		},
		async assertExchange(exchange: string): Promise<void> {
			await channel.assertExchange(exchange, 'topic')
		},
		async assertQueue(name: string): Promise<void> {
			await channel.assertQueue(name, {
				arguments: {
					'x-queue-type': 'quorum',
					'x-delivery-limit': 5,
				},
			})
		},
		async bindQueue(queue: string, exchange: string, topic: string): Promise<void> {
			await channel.bindQueue(queue, exchange, topic)
		},
		async close(): Promise<void> {
			await connection.close()	
		},
		async consume(queue: string, handler: (message) => void): Promise<void> {
			await channel.consume(queue, handler)
		},
		async ack(message: MqMessageEnvelope): Promise<void> {
			channel.ack(message)
		},
		async nack(message: MqMessageEnvelope): Promise<void> {
			channel.nack(message, false, true)
		},
	}
}

export { createAmqpEngine }
