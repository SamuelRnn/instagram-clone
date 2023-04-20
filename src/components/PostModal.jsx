import { useSessionStore } from '@/store'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { AiOutlineClose } from 'react-icons/ai'

async function uploadImage(file) {
	const body = {
		UPLOADCARE_PUB_KEY: process.env.NEXT_PUBLIC_UPLOADCARE_PUB_KEY,
		file,
	}

	const { data } = await axios.postForm(
		'https://upload.uploadcare.com/base/',
		body
	)
	return `https://ucarecdn.com/${data.file}/`
}

export default function PostModal({ closeCreateModal }) {
	const user = useSessionStore(state => state.user)
	const [image, setImage] = useState(null)
	const [text, setText] = useState('')
	const [imagePreview, setImagePreview] = useState(null)

	const onImageChange = event => {
		setImage(event.target.files[0])
		setImagePreview(URL.createObjectURL(event.target.files[0]))
	}
	const onTextChange = event => setText(event.target.value)

	const onSubmit = async event => {
		event.preventDefault()
		const cdnURL = await uploadImage(image)
		const newPost = { image: cdnURL, text, id_user: user.id }

		try {
			const { data } = await axios.post('/api/posts', newPost)
			console.log(data)
		} catch (error) {
			console.log(error.message)
		}
	}
	useEffect(() => {
		document.body.style.overflow = 'hidden'
		return () => (document.body.style.overflow = 'auto')
	}, [])

	return (
		<div className="fixed z-50 h-screen w-full top-0 left-0 bg-main-black-accent/90 flex items-center">
			<div className="mx-auto flex flex-col items-center bg-main-black p-4 pt-0 border rounded-md border-zinc-700 h-fit">
				<div className="mb-4 text-center py-2 border-b border-zinc-700 w-full relative">
					<button className="absolute right-2 top-3" onClick={closeCreateModal}>
						<AiOutlineClose className="text-xl" />
					</button>
					<p>Agrega una publicación</p>
				</div>
				<form onSubmit={onSubmit} className="flex flex-wrap w-full gap-4">
					<label
						className="cursor-pointer rounded-lg border border-zinc-700 aspect-square overflow-hidden w-[290px] relative grid place-content-center hover:bg-main-black-accent"
						title="subir imagen"
					>
						<input
							type="file"
							onChange={onImageChange}
							accept="image/*"
							hidden
						/>
						{imagePreview ? (
							<Image
								src={imagePreview}
								alt="image preview"
								fill
								className="object-contain"
							/>
						) : (
							<p className="text-zinc-500">Agregar una imagen</p>
						)}
					</label>
					<div className=" w-[290px] flex flex-col justify-between">
						<textarea
							onChange={onTextChange}
							name="text"
							className="bg-transparent outline-none h-32 resize-none px-2 py-1 text-sm"
							placeholder="Escribe una descripción"
						/>
						<button type="submit" className="button py-3 w-full">
							Crear
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
