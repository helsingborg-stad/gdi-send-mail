import { ContentBuildProvider } from '../service'

/**
 * Example content provider
 * @returns A ContentBuildProvider instance
 */
export const createDefaultContentProvider = (verificationUrl: string): ContentBuildProvider => async (message) => ({
	subject: 'default',
	body: `${verificationUrl}${message.verificationCode}`,
})
