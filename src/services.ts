import { getContentServiceFromEnv } from './services/content/service'
import { getQueueServiceFromEnv } from './services/queue/service'
import { getEmailServiceFromEnv } from './services/email/service'
import { Services } from './types'

const createServicesFromEnv = (): Services => ({
	queueService: getQueueServiceFromEnv(),
	contentService: getContentServiceFromEnv(),
	emailService: getEmailServiceFromEnv(),
})

export { createServicesFromEnv }