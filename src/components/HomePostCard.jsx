import { AiFillHeart } from 'react-icons/ai'
import { RiSendPlaneFill } from 'react-icons/ri'
import { MdInsertComment } from 'react-icons/md'
import Image from 'next/image'
import Link from 'next/link'
import { useSessionStore } from '@/store'
import axios from 'axios'
import { useRef, useState } from 'react'
import { toast } from 'react-hot-toast'

export default function HomePostCard({
	post: postInitialData,
	skeleton = false,
	full = false,
}) {
	const [post, setPost] = useState(postInitialData)
	const user = useSessionStore(state => state.user)
	const commentRef = useRef(null)

	const addComment = async () => {
		const { data } = await axios.post(`/api/posts/${post.id}/comments`, {
			userId: user.id,
			content: commentRef.current.value,
		})
		if (data.ok) {
			setPost(data.post)
			commentRef.current.value = ''
			commentRef.current.blur()
		}
	}
	const deleteComment = async commentId => {
		const { data } = await axios.delete(`/api/posts/${post.id}/comments`, {
			params: {
				commentId,
			},
		})
		if (data.ok) {
			setPost(data.post)
		}
	}
	const likeAction = () => {
		const like = post.liked_by.find(currUser => currUser.id_user === user.id)
		if (!user) {
			return toast.error('Inicia sesión antes!')
		}
		if (like) {
			deleteLike()
		} else {
			addLike()
		}
	}
	const addLike = async () => {
		const { data } = await axios.post(`/api/posts/${post.id}/likes`, {
			userId: user.id,
		})
		if (data.ok) {
			setPost(data.post)
		}
	}
	const deleteLike = async () => {
		const { data } = await axios.delete(`/api/posts/${post.id}/likes`, {
			params: {
				userId: user.id,
			},
		})
		if (data.ok) {
			setPost(data.post)
		}
	}

	return (
		<div className="w-full flex flex-col">
			<div className="flex items-center py-4 gap-3 text-sm">
				{skeleton ? (
					<div className="w-10 h-10 rounded-full bg-zinc-800" />
				) : (
					<Link href={`/user/${post?.author.id}`}>
						<Image
							src={post?.author.avatar || '/assets/logo.svg'}
							alt="profile name"
							width={40}
							height={40}
							className="rounded-full outline outline-2 outline-zinc-700 text-xs grid place-content-center object-cover w-10 h-10"
						/>
					</Link>
				)}
				{skeleton ? (
					<p className="h-4 w-32 bg-zinc-800 rounded-md"></p>
				) : (
					<Link href={`/user/${post?.author.id}`}>
						<p>{post?.author.user_name}</p>
					</Link>
				)}
			</div>
			<div className="bg-main-black-accent overflow-hidden border border-zinc-700 aspect-square rounded-md">
				{skeleton ? (
					<div className="w-full h-full bg-zinc-800"></div>
				) : (
					<Link
						href={`/post/${post?.id}`}
						className="h-full flex items-center"
						title="ver post completo"
					>
						<Image
							src={post?.image}
							width={800}
							height={800}
							alt={post?.text ?? 'post image'}
							className=" object-contain"
						/>
					</Link>
				)}
			</div>
			<div className="py-3 text-2xl flex justify-between">
				<div className="flex gap-3">
					<div className="flex gap-1">
						<button onClick={likeAction} className="">
							<AiFillHeart
								className={`post-actions ${
									user &&
									post?.liked_by?.find(
										currUser => currUser?.id_user === user.id
									) &&
									'text-red-500'
								}`}
							/>
						</button>
						<span className="text-sm select-none">
							{post?.liked_by.length ?? 0}
						</span>
					</div>
					<div className="flex gap-1">
						<Link href={`/post/${post?.id}`} title="ver post completo">
							<MdInsertComment className="post-actions" />
						</Link>
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
					{!full && post?.text && post.text.slice(0, 100)}
					{post.text.length > 100 && '... '}
					{!full && post?.text && post.text.length > 100 && (
						<Link href={`/post/${post?.id}`} title="ver post completo">
							<button className="hover:underline text-zinc-300">
								Leer más
							</button>
						</Link>
					)}
					{full && <span>{post?.text}</span>}
				</p>
			)}
			<hr className="border-zinc-700 my-4" />
			{full && (
				<div>
					<p>Comentarios ({post?.comments.length})</p>

					<div className="flex flex-col py-3 gap-y-3">
						{post?.comments.map(comment => (
							<div key={comment.id} className="text-sm">
								<p>
									<Link
										href={`/user/${comment.id_user}`}
										className="font-bold hover:underline"
									>
										{comment.author.user_name}
									</Link>
									<span> {comment.content}</span>
									{comment.id_user === user?.id && (
										<span
											className="text-zinc-400 hover:underline cursor-pointer"
											onClick={() => deleteComment(comment.id)}
										>
											{' '}
											Borrar mi comentario
										</span>
									)}
								</p>
							</div>
						))}
						{user ? (
							<>
								<textarea
									ref={commentRef}
									className="input resize-none w-full h-40"
									placeholder="Agrega un comentario"
									maxLength={200}
								/>
								<div className="grid grid-cols-2 gap-4">
									<button className="button py-3 px-2">Reiniciar</button>
									<button
										className="button-light py-3 px-2"
										onClick={addComment}
									>
										Aceptar
									</button>
								</div>
							</>
						) : (
							<p className="mt-2 text-zinc-500">
								Inicia sesión para participar
							</p>
						)}
					</div>
				</div>
			)}
		</div>
	)
}
