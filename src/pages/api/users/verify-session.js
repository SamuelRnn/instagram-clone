import { prisma } from '@/config'
import { verifyToken } from '@/utils'

export default async function handler(req, res) {
	const verifiedToken = verifyToken(req.cookies.token)
	if (!verifiedToken) {
		return res.status(401).json({ message: 'Sin sesión activa' })
	} else {
		const user = await prisma.user.findFirst({
			where: { id: verifiedToken.id },
		})
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
