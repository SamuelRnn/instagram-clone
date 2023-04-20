import { Layout, ProfilePostPreview } from '@/components'
import { prisma } from '@/config'
import Image from 'next/image'
import { AiFillEdit } from 'react-icons/ai'

export default function UserProfile({ user }) {
	return (
		<Layout>
			<div className="pb-6 border-b border-zinc-700 w-profile mx-auto pt-12">
				<div className="mx-auto max-w-[600px] flex gap-6">
					<Image
						src={
							user.avatar ??
							'https://ucarecdn.com/ff33b248-1904-4f99-bfc3-02ad9f7d5fd5/'
						}
						alt={user.user_name}
						width={150}
						height={150}
						className="rounded-full outline outline-2 outline-zinc-700 overflow-hidden min-w-[80px] sm:min-w-[150px] aspect-square "
					/>
					<div className="min-w-[180px] mt-2">
						<div className="flex items-center gap-2 text-lg">
							<h1 className="text-base sm:text-lg font-bold max-w-[128px] sm:max-w-[240px] overflow-hidden text-ellipsis">
								{user.user_name}
							</h1>
							<button className="flex items-center hover:underline">
								<span className="hidden lg:block text-sm">Editar perfil</span>
								<AiFillEdit className="m-2 text-xl" />
							</button>
						</div>
						<p className="text-sm text-zinc-400">
							{user?.posts.length} publicaciones
						</p>
						<p className="hidden sm:block text-sm">{user.about_me}</p>
					</div>
				</div>
				<p className="sm:hidden text-sm mt-4">{user.about_me}</p>
			</div>
			{/* posts container */}
			<div className="w-full grid grid-cols-3 gap-1 mt-8 max-w-[700px] mx-auto">
				{user.posts.map(post => (
					<ProfilePostPreview key={post.id} post={post} />
				))}
			</div>
			{!user.posts.length && (
				<p className="text-center text-zinc-500">No hay nada que ver aqui</p>
			)}
		</Layout>
	)
}

export async function getServerSideProps(ctx) {
	const { idUsuario } = ctx.query
	const userInfo = await prisma.user.findUnique({
		where: { id: idUsuario },
		select: {
			about_me: true,
			avatar: true,
			email: true,
			posts: {
				select: {
					id: true,
					image: true,
				},
				orderBy: {
					created_at: 'desc',
				},
			},
			user_name: true,
		},
	})

	return {
		props: { user: userInfo },
	}
}
