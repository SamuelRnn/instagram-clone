import { Layout } from '@/components'
import { prisma } from '@/config'
import Image from 'next/image'
import { AiFillEdit } from 'react-icons/ai'

export default function UserProfile({ user }) {
	return (
		<Layout>
			<div className="w-profile mx-auto h-full pt-12">
				<div className="mx-auto max-w-[600px] flex gap-6 items-center">
					<Image
						src={
							user.avatar ??
							'https://ucarecdn.com/ff33b248-1904-4f99-bfc3-02ad9f7d5fd5/'
						}
						alt={user.user_name}
						width={150}
						height={150}
						className="rounded-full outline outline-2 outline-zinc-700 overflow-hidden min-w-[80px] md:min-w-[150px] aspect-square"
					/>
					<div className="min-w-[180px] border">
						<div className="flex items-center gap-2 text-lg">
							<h1 className="text-base sm:text-lg font-bold w-[128px] sm:w-[240px] overflow-hidden text-ellipsis">
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
						<p className="hidden md:block text-sm">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
							eligendi, doloribus inventore neque unde deserunt. Incidunt qui
							sequi quam facilis cum, maiores sit molestias omnis? Suscipit
							perspiciatis tenetur dolorum ut?
						</p>
					</div>
				</div>
				<p className="md:hidden text-sm mt-4">
					Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
					eligendi, doloribus inventore neque unde deserunt. Incidunt qui sequi
					quam facilis cum, maiores sit molestias omnis? Suscipit perspiciatis
					tenetur dolorum ut?
				</p>
			</div>
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
			posts: true,
			user_name: true,
		},
	})

	return {
		props: { user: userInfo },
	}
}
