import { HomePostCard, Layout } from '@/components'
import { prisma } from '@/config'

export default function Post({ post }) {
	return (
		<Layout>
			<div className="mx-auto w-box">
				<HomePostCard post={post} full />
			</div>
		</Layout>
	)
}

export async function getServerSideProps(ctx) {
	const { idPost } = ctx.query
	const post = await prisma.post.findUnique({
		where: { id: +idPost },
		select: {
			id: true,
			image: true,
			text: true,
			author: {
				select: {
					id: true,
					avatar: true,
					user_name: true,
				},
			},
			liked_by: {
				select: {
					id: true,
					id_user: true,
				},
			},
			comments: {
				orderBy: {
					created_at: 'desc',
				},
				select: {
					id: true,
					id_user: true,
					author: {
						select: {
							id: true,
							user_name: true,
						},
					},
					content: true,
				},
			},
		},
	})
	return {
		props: {
			post,
		},
	}
}
