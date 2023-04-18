import Image from 'next/image'
import text_logo from '../../public/assets/text-logo.svg'
import Link from 'next/link'

export default function Login() {
	const onSubmit = event => {
		event.preventDefault()
	}
	return (
		<main className="h-screen flex items-center justify-center">
			<div className="border w-form rounded-xl flex flex-col items-center h-box border-zinc-700 px-6">
				<Image src={text_logo} alt="text instagram logo" width={160} />
				<form
					className="flex flex-col w-full gap-2 text-center"
					onSubmit={onSubmit}
				>
					<input
						type="email"
						className="input"
						placeholder="Correo Electrónico"
					/>
					<input type="password" className="input" placeholder="Contraseña" />
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
