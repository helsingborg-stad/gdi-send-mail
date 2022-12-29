import { getEnv } from '@helsingborg-stad/gdi-api-node'
import { ContentBuildProvider } from '../service'

/**
 * Helsingborgs stad content provider
 * @returns A ContentBuildProvider instance
 */
export const tryCreateHelsingborgFromEnv = (): ContentBuildProvider => {
	if (getEnv('CONTENT_PROVIDER', { fallback: '' }) !== 'helsingborg') {
		return null
	}
	const verificationPath = getEnv('CONTENT_VERIFICATION_PATH', { fallback: '' })

	return async (message) => ({
		subject: 'Bekräfta E-postadress',
		body: [
			'Hej!',
			'Tack för att du angett din epostadress på helsingborg.se',
			'För att verifiera att det är din adress, vänligen bekräfta genom',
			`att klicka på denna länk: ${verificationPath}${message.verificationCode}`,
		].join('\n'),
	})

}
