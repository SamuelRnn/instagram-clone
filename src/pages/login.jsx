import Image from 'next/image'
import text_logo from '../../public/assets/text-logo.svg'
import Link from 'next/link'
import { useRef } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { useSession } from '@/store'

export default function Login() {
	const emailRef = useRef(null)
	const pwRef = useRef(null)
	const router = useRouter()
	const session = useSession()

	const onSubmit = async event => {
		event.preventDefault()
		try {
			const { data } = await axios.post('/api/users/login', {
				email: emailRef.current.value,
				password: pwRef.current.value,
			})
			session.setUser(data.user)
			router.push('/')
		} catch (error) {
			console.log(error)
		}
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
						type="email"
						ref={emailRef}
						className="input"
						placeholder="Correo Electrónico"
					/>
					<input
						type="password"
						ref={pwRef}
						className="input"
						placeholder="Contraseña"
					/>
					<button
						type="submit"
						className="h-12 bg-main-accent hover:bg-opacity-75 rounded-lg mt-4"
					>
						Entrar
					</button>
				</form>
				<hr className="m-6 w-full border-zinc-700" />
				<p className="text-zinc-400 text-sm">
					<span>¿No tienes una cuenta? </span>
					<Link href="/register" className="text-main-accent hover:underline">
						Regístrate
					</Link>
				</p>
			</div>
		</main>
	)
}
