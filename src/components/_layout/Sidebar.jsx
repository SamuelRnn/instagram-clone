import Image from 'next/image'
import white_text_logo from '../../../public/assets/white-text-logo.svg'
import { AiFillHome, AiOutlineSearch, AiFillHeart } from 'react-icons/ai'
import { BsFillImageFill } from 'react-icons/bs'
import { useRouter } from 'next/router'

export default function Sidebar() {
	const router = useRouter
	return (
		<div className="bg-main-black-accent border-r border-zinc-800 fixed md:sticky top-0 h-screen w-[270px] shadow-md">
			<nav className="">
				<Image
					src={white_text_logo}
					alt="text instagram logo"
					width={160}
					className="ml-2"
				/>
				<div className="flex flex-col px-3 gap-4">
					<div className="nav-action">
						<AiFillHome className="text-2xl" />
						Inicio
					</div>
					<div className="nav-action">
						<AiOutlineSearch className="text-2xl" />
						Búsqueda
					</div>
					<div className="nav-action">
						<AiFillHeart className="text-2xl" />
						Notificaciones
					</div>
					<div className="nav-action">
						<BsFillImageFill className="text-2xl" />
						Crear
					</div>
				</div>
			</nav>
		</div>
	)
}
