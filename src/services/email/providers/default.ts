import { EmailSendProvider } from '../service'

/**
 * Example provider. Prints the message to console
 * @returns An EmailSendProvider instance
 */
export const createDefaultEmailProvider = (): EmailSendProvider => async (to, message) => { console.log ([
	`To: ${to}`,
	`Subject: ${message.subject}`,
	`Body: ${message.body}`,
].join('\n')) }
	
