import { EmailSendProvider } from '../service'

/**
 * Default action prints the message to console
 * @returns An EmailSendProvider instance
 */
export const createDefaultEmailProvider = (): EmailSendProvider => async (to, message) => { console.log (`To: ${to}\nSubject: ${message.subject}\nBody: ${message.body}`) }
	
