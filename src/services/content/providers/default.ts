import { ContentBuildProvider } from '../service'

/**
 * Default action prints the message to console
 * @returns An EmailSendProvider instance
 */
export const createDefaultContentProvider = (basePath: string): ContentBuildProvider => async (message) => ({
	subject: basePath,
	body: message.verificationCode,
})
