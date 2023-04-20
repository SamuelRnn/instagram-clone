import { Layout, HomePostCard } from '@/components/'
import axios from 'axios'
import { useEffect, useState } from 'react'

export default function Home() {
	const [posts, setPosts] = useState([])

	useEffect(() => {
		const getPosts = async () => {
			const { data } = await axios.get('/api/posts')
			setTimeout(() => {
				setPosts(data.posts)
			}, 2000)
		}
		getPosts()
	}, [])

	return (
		<Layout>
			<div className="w-full pt-12">
				<div className="min-h-screen w-box mx-auto">
					{!posts.length && <HomePostCard skeleton />}
					{!posts.length && <HomePostCard skeleton />}
					{posts.map(post => (
						<HomePostCard post={post} key={post.id} />
					))}
				</div>
			</div>
		</Layout>
	)
}
