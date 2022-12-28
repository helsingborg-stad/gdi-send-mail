import { getContentService } from '../services/content/service'

it('returns a templated string with an injected verificationcode', async () => {
	const verificationCode = 'dcd77d41-c1fa-4d90-851a-4d5f03d0183a'
	const basePath = 'https://mypage'
	
	expect(await getContentService(basePath).build({
		address: 'test@test.se',
		verificationCode,
		isVerified: false,
		verifiedDate: null,
	})).toEqual({
		subject: basePath,
		body: verificationCode,
	})
})
