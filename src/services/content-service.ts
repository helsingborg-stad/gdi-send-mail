import { getEnv } from '@helsingborg-stad/gdi-api-node'
import { MqMessageBody, ContentService, MailContent } from '../types'

const formatContent = (verificationCode: string, basePath: string): MailContent => ({
	subject: 'Bekräfta E-postadress',
	body: `Hej!
Tack för att du angett din epostadress på helsingborg.se
För att verifiera att det är din adress, vänligen bekräfta genom
att klicka på denna länk: ${basePath}${verificationCode}`,
})

const getContentServiceFromEnv = (): ContentService => getContentService(
	getEnv('EMAIL_BASEPATH')
)

const getContentService = (basePath: string): ContentService  => ({
	build: async (message: MqMessageBody): Promise<MailContent> => formatContent(message.verificationCode, basePath),
})

export { getContentService, getContentServiceFromEnv, formatContent }
