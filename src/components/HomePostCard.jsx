import { AiFillHeart } from 'react-icons/ai'
import { RiSendPlaneFill } from 'react-icons/ri'
import { MdInsertComment } from 'react-icons/md'
import Image from 'next/image'

// modes = post | skeleton
export default function HomePostCard({ post, skeleton = false }) {
	return (
		<div className="w-full flex flex-col">
			<div className="flex items-center py-4 gap-3 text-sm">
				{skeleton ? (
					<div className="w-10 h-10 rounded-full bg-zinc-800" />
				) : (
					<Image
						src={post?.author.avatar || '/assets/logo.svg'}
						alt="profile name"
						width={40}
						height={40}
						className="rounded-full outline outline-2 outline-zinc-700 text-xs overflow-hidden grid place-content-center"
					/>
				)}
				{skeleton ? (
					<p className="h-4 w-32 bg-zinc-800 rounded-md"></p>
				) : (
					<p>{post?.author.user_name}</p>
				)}
			</div>
			<div className="bg-main-black-accent border border-zinc-700 aspect-square rounded-md relative">
				{skeleton ? (
					<div className="w-full h-full bg-zinc-800"></div>
				) : (
					<Image
						src={post?.image}
						fill
						alt={post?.text}
						className=" object-contain"
					/>
				)}
			</div>
			<div className="py-3 text-2xl flex justify-between">
				<div className="flex gap-3">
					<div className="flex gap-1">
						<button>
							<AiFillHeart className="post-actions" />
						</button>
						<span className="text-sm select-none">
							{post?.liked_by.length ?? 0}
						</span>
					</div>
					<div className="flex gap-1">
						<button>
							<MdInsertComment className="post-actions" />
						</button>
						<span className="text-sm select-none">
							{post?.comments.length ?? 0}
						</span>
					</div>
				</div>
				<RiSendPlaneFill className="post-actions" />
			</div>
			{skeleton ? (
				<div className="w-full rounded-md h-14 bg-zinc-800"></div>
			) : (
				<p className="text-zinc-400 text-sm">
					<span className="text-zinc-200 font-bold">
						<button>{post?.author.user_name}</button>
					</span>{' '}
					{post?.text}{' '}
					<span>
						<button className="hover:underline text-zinc-300">Leer más</button>
					</span>
				</p>
			)}
			<hr className="border-zinc-700 my-4" />
		</div>
	)
}
