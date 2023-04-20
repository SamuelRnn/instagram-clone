import { prisma } from '@/config'

export default async function handler(req, res) {
	if (req.method === 'GET') {
		const posts = await prisma.post.findMany({
			include: {
				author: true,
				liked_by: true,
				comments: true,
			},
			orderBy: {
				created_at: 'desc',
			},
		})
		return res.status(200).json({ posts })
	}
	if (req.method === 'POST') {
		const postData = req.body

		await prisma.post.create({
			data: { ...postData },
		})
		return res.status(201).json({ message: 'Post creado correctamente!' })
	}
}
