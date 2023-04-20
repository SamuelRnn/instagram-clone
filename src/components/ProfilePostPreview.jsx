import Image from 'next/image'

export default function ProfilePostPreview({ post }) {
	return (
		<div className="aspect-square outline outline-1 outline-zinc-700 relative">
			<Image
				src={post.image}
				alt="post image"
				fill
				className="object-cover object-center"
			/>
		</div>
	)
}
