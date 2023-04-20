import Image from 'next/image'
import logo from '../../../public/assets/logo.svg'
import Link from 'next/link'
import dynamic from 'next/dynamic'

function RegisterBanner() {
	return (
		<div className="fixed w-full bottom-0 left-0 h-40 bg-neutral-950 flex items-center">
			<div className="mx-auto w-banner text-sm flex flex-col md:flex-row justify-center md:justify-between">
				<div className="flex">
					<Image src={logo} alt="instagram logo" width={80} height={80} />
					<div className="flex flex-col gap-y-2">
						<p className="font-bold text-base">Iniciar sesión en Instaclone</p>
						<p className="max-w-sm">
							Inicia sesión para ver las fotos y los videos de tus amigos y
							descubrir otras cuentas que te encantarán.
						</p>
					</div>
				</div>
				<div className="flex md:flex-col gap-3 max-md:mx-auto max-md:mt-3 font-bold">
					<Link
						href="/login"
						className="button-light-variant px-3 py-2 grid place-content-center"
					>
						Iniciar Sesión
					</Link>
					<Link
						href="/register"
						className="button px-3 py-2 grid place-content-center"
					>
						Registrarse
					</Link>
				</div>
			</div>
		</div>
	)
}
export default dynamic(() => Promise.resolve(RegisterBanner), { ssr: false })