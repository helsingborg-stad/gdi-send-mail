import { createServicesFromEnv } from './services'

const services = createServicesFromEnv()

services.queueService.listen(async message => 
	await services.emailService.send(message.address, 
		await services.contentService.build(message),
	)).catch(err => {
	console.error(err)
	process.exit(1)
})
