import Image from 'next/image'
import text_logo from '../../public/assets/text-logo.svg'
import Link from 'next/link'
import axios from 'axios'
import { useState } from 'react'

export default function Register() {
	const [form, setForm] = useState({
		user_name: '',
		email: '',
		password: '',
	})
	const onSubmit = async event => {
		event.preventDefault()
		console.log(form)
		try {
			const { data } = await axios.post('/api/users', form)
			if (data.status === 'ok') {
				alert('exito')
			}
		} catch (error) {
			console.log(error)
		}
	}
	const onChange = event => {
		setForm(state => ({ ...state, [event.target.name]: event.target.value }))
	}
	return (
		<main className="h-screen flex items-center justify-center">
			<div className="border w-form rounded-xl flex flex-col items-center h-box border-zinc-700 px-6">
				<Image src={text_logo} alt="text instagram logo" width={160} />
				<form
					className="flex flex-col w-full gap-3 text-center"
					onSubmit={onSubmit}
				>
					<input
						onChange={onChange}
						value={form.user_name}
						name="user_name"
						type="text"
						className="input"
						placeholder="Nombre de usuario"
					/>
					<input
						onChange={onChange}
						value={form.email}
						name="email"
						type="email"
						className="input"
						placeholder="Correo Electrónico"
					/>
					<input
						onChange={onChange}
						value={form.password}
						name="password"
						type="password"
						className="input"
						placeholder="Contraseña"
					/>
					<button
						type="submit"
						className="h-12 bg-main-accent hover:bg-opacity-75 rounded-lg mt-4"
					>
						Registrarte
					</button>
				</form>
				<hr className="m-6 w-full border-zinc-700" />
				<p className="text-zinc-400 text-sm">
					<span>¿Tienes una cuenta? </span>
					<Link href="/login" className="text-main-accent hover:underline">
						Entrar
					</Link>
				</p>
			</div>
		</main>
	)
}