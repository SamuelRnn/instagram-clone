import { prisma, mailer } from '@/config'
import { createToken } from '@/utils'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		//gets user id from query
		const { id } = req.query
		const user = await prisma.user.findFirst({
			where: { id },
		})
		res.status(200).json({ user })
	}

	if (req.method === 'POST') {
		//creates user
		const registerData = req.body
		const createdUser = await prisma.user.create({ data: registerData })

		const registerToken = createToken(createdUser.id)

		const verifyTokenURL =
			process.env.NODE_ENV !== 'production'
				? `http://localhost:3000/api/users/validate/${registerToken}`
				: `${process.env.NEXT_PUBLIC_DEPLOY_URL}/api/users/validate/${registerToken}`

		const html = `
			<h1>Cuenta de Instaclone creada satisfactoriamente</h1>
				<a href="${verifyTokenURL}" target="_blank" >Verifica tu cuenta</a>
		`
		await mailer.sendMail({
			from: 'Instagram clone <samuel.rnn31@gmail.com>',
			to: createdUser.email,
			subject: 'Verifica tu cuenta',
			html,
		})
		res.status(201).json({ status: 'ok' })
	}
}
