import { HomePostCard, Layout } from '@/components'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export default function Search() {
	const [posts, setPosts] = useState(null)
	const [noResults, setNoResults] = useState(false)
	const search = useRef(null)
	const onSubmit = async event => {
		event.preventDefault()
		setNoResults(false)
		setPosts([])
		search.current.blur()
		const { data } = await axios.get('/api/posts', {
			params: {
				s: search.current.value,
			},
		})
		setTimeout(() => {
			if (!data.posts.length) {
				setNoResults(true)
				setPosts(null)
			} else {
				setPosts(data.posts)
			}
		}, 500)
	}
	useEffect(() => search.current.focus(), [])
	return (
		<Layout>
			<div className="w-box mx-auto min-h-screen">
				<form onSubmit={onSubmit} className="relative input flex gap-2 mb-10">
					<input type="text" className="input w-full" ref={search} />
					<button
						type="submit"
						className="bg-zinc-900 rounded-lg hover:bg-zinc-800 border border-zinc-700"
					>
						<AiOutlineSearch className="text-3xl m-2" />
					</button>
				</form>
				{posts && !posts.length && <HomePostCard skeleton />}
				{posts && !posts.length && <HomePostCard skeleton />}
				{posts?.map(post => (
					<HomePostCard post={post} key={post.id} />
				))}
				{!posts && !noResults && (
					<p className="text-center text-zinc-500">
						Busca publicaciones a través de palabras clave!
					</p>
				)}
				{noResults && (
					<p className="text-center text-zinc-500">
						Ningún resultado para &quot;{search.current.value}&quot;.
					</p>
				)}
			</div>
		</Layout>
	)
}
