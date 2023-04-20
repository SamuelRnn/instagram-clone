import { HomePostCard, Layout } from '@/components'
import axios from 'axios'
import { useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export default function Search() {
	const [posts, setPosts] = useState(null)
	const search = useRef(null)

	const onSubmit = async event => {
		event.preventDefault()
		setPosts([])
		search.current.blur()
		const { data } = await axios.get('/api/posts', {
			params: {
				s: search.current.value,
			},
		})
		setTimeout(() => {
			setPosts(data.posts)
		}, 500)
	}
	return (
		<Layout>
			<div className="w-box mx-auto pt-12 min-h-screen">
				<form onSubmit={onSubmit} className="relative input flex gap-2 mb-10">
					<input type="text" className="input w-full" ref={search} />
					<button
						type="submit"
						className="bg-zinc-900 rounded-md hover:bg-zinc-800"
					>
						<AiOutlineSearch className="text-3xl m-2" />
					</button>
				</form>
				{posts && !posts.length && <HomePostCard skeleton />}
				{posts && !posts.length && <HomePostCard skeleton />}
				{posts?.map(post => (
					<HomePostCard post={post} key={post.id} />
				))}
				{!posts && (
					<p className="text-center text-zinc-500">
						Busca publicaciones a través de palabras clave!
					</p>
				)}
			</div>
		</Layout>
	)
}
