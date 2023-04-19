import { prisma } from '@/config'
import { createToken } from '@/utils'
import { serialize } from 'cookie'

export default async function handler(req, res) {
	if (req.method === 'POST') {
		const loginData = req.body
		const user = await prisma.user.findFirst({
			where: {
				email: loginData.email,
				password: loginData.password,
			},
		})
		if (!user) {
			return res.status(400).json({
				error:
					'Verifica tu correo electrónico y contraseña e inténtalo de nuevo.',
			})
		}
		if (!user.active) {
			return res.status(400).json({ error: 'Active su cuenta' })
		}

		const token = createToken(user.id)

		const serializedToken = serialize('token', token, {
			httpOnly: false, //true after
			secure: false, //true on production
			sameSite: 'strict',
			maxAge: 1000 * 60 * 60 * 24 * 30,
			path: '/',
		})

		res.setHeader('Set-Cookie', serializedToken)
		return res.status(200).json({
			error: null,
			user: {
				user_name: user.user_name,
				avatar: user.avatar,
				email: user.email,
			},
		})
	}
}