import { Layout } from '@/components'
import { useSessionStore } from '@/store'
import axios from 'axios'
import { useState } from 'react'

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

export default function Create() {
	const user = useSessionStore(state => state.user)
	const [image, setImage] = useState(null)
	const [text, setText] = useState('')
	const onImageChange = event => {
		setImage(event.target.files[0])
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

	return (
		<Layout>
			<div className="w-box mx-auto h-screen flex items-center">
				<form onSubmit={onSubmit} className="flex flex-col w-full gap-y-4">
					<div className="rounded-lg border border-zinc-700 aspect-square overflow-hidden">
						<input type="file" onChange={onImageChange} />
					</div>
					<textarea
						onChange={onTextChange}
						name="text"
						className="input h-32 resize-none"
						placeholder="Escribe una descripción"
					/>
					<button type="submit" className="button py-3">
						Crear
					</button>
				</form>
			</div>
		</Layout>
	)
}
