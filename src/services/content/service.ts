import { MessageBody, MailContent } from '../../types'
import { createDefaultContentProvider } from './providers/default'
import { tryCreateHelsingborgFromEnv } from './providers/helsingborg'

/**
 * Required signature of a provider
 */
export type ContentBuildProvider = (message: MessageBody) => Promise<MailContent>

/**
 * The signature of the Content service
 */
export interface ContentService {
    build: ContentBuildProvider
}

/**
 * Handler for missing providers
 */
const missingProvider = (): ContentBuildProvider => { throw Error('Missing Email provider') }

/**
 * Service instantiation from environment configuration
 * @returns An EmailService instance
 */
export const getContentServiceFromEnv = (): ContentService => {
	return {
		build: tryCreateHelsingborgFromEnv() || missingProvider(),
	}
}

/**
 * Static execution of Service
 * @returns An EmailService instance
 */
export const getContentService = (basePath: string): ContentService => ({ build: createDefaultContentProvider(basePath) })
