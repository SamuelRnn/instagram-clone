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
				message:
					'Verifica tu correo electrónico y contraseña e inténtalo de nuevo.',
			})
		}
		if (!user.active) {
			return res.status(400).json({
				message: 'Por favor, active su cuenta. Revise su bandeja de email',
			})
		}

		const token = createToken(user.id)

		const serializedToken = serialize('token', token, {
			httpOnly: true,
			secure: process.env.NODE_ENV === 'production',
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 60,
			path: '/',
		})

		res.setHeader('Set-Cookie', serializedToken)
		return res.status(200).json({
			user: {
				user_name: user.user_name,
				avatar: user.avatar,
				email: user.email,
				id: user.id,
			},
		})
	}
}
