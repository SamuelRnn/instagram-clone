import Image from 'next/image'
import Link from 'next/link'

export default function ProfilePostPreview({ post }) {
	return (
		<Link href={`/post/${post.id}`} className="overflow-hidden">
			<div className="aspect-square outline outline-1 outline-zinc-700 relative transition-transform ease-out bg-zinc-800">
				<Image
					src={post.image}
					alt="post image"
					fill
					className="object-cover object-center"
				/>
			</div>
		</Link>
	)
}
