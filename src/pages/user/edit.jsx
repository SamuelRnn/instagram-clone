import { Layout } from '@/components'
import { prisma } from '@/config'
import { verifyToken } from '@/utils'

export default function Edit({ user }) {
	console.log(user)
	return (
		<Layout>
			<div className="w-box mx-auto border rounded-lg border-zinc-700 h-screen">
				<form></form>
			</div>
		</Layout>
	)
}

export async function getServerSideProps(ctx) {
	const token = ctx.req.cookies['token']

	if (!token) {
		return {
			redirect: {
				destination: '/',
				permanent: true,
			},
		}
	}
	const verifiedToken = verifyToken(token)

	const user = await prisma.user.findUnique({
		where: { id: verifiedToken.id },
		select: {
			about_me: true,
			avatar: true,
			email: true,
			user_name: true,
		},
	})

	return {
		props: { user },
	}
}
