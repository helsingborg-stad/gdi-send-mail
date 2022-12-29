import { MailContent } from '../../types'
import { createDefaultEmailProvider } from './providers/default'
import { tryCreateHelsingborgFromEnv } from './providers/helsingborg'

/**
 * Required signature of a provider
 */
export type EmailSendProvider = (to: string, message: MailContent) => Promise<void>

/**
 * The signature of the Email service
 */
export interface EmailService {
    send: EmailSendProvider
}

/**
 * Service instantiation from environment configuration
 * @returns An EmailService instance
 */
export const getEmailServiceFromEnv = (): EmailService => {
	return {
		send: tryCreateHelsingborgFromEnv() || createDefaultEmailProvider(),
	}
}

/**
 * Static execution of Service
 * @returns An EmailService instance
 */
export const getEmailService = (): EmailService => ({ send: createDefaultEmailProvider() })
