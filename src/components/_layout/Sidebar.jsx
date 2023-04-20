import Image from 'next/image'
import white_text_logo from '../../../public/assets/white-text-logo.svg'
import {
	AiFillHome,
	AiOutlineSearch,
	AiFillHeart,
	AiOutlineClose,
	AiOutlineMenuUnfold,
} from 'react-icons/ai'
import { BsFillImageFill } from 'react-icons/bs'
import { BiLogOut } from 'react-icons/bi'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useEffect } from 'react'
import { useSidebarStore } from '@/store'
import axios from 'axios'

function Sidebar({ user }) {
	const sidebarTranslate = useSidebarStore(state => state.sidebarTranslate)
	const setSidebarTranslate = useSidebarStore(
		state => state.setSidebarTranslate
	)

	const logout = async () => {
		try {
			await axios.post('/api/users/logout')
			location.href = '/'
		} catch (error) {
			alert('unexpected error')
		}
	}

	useEffect(() => {
		const sidebarStateChecker = () => {
			if (innerWidth > 768) setSidebarTranslate('0%')
			else setSidebarTranslate('-100%')
		}
		window.addEventListener('resize', sidebarStateChecker)
		sidebarStateChecker()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<button
				onClick={() => setSidebarTranslate('0%')}
				className="fixed top-8 bg-zinc-800 rounded-r-xl shadow-md"
			>
				<AiOutlineMenuUnfold className="text-2xl m-3" />
			</button>
			<div
				className={`bg-main-black-accent border-r border-zinc-800 fixed md:sticky top-0 h-screen overflow-y-auto w-[270px] shadow-md transition-transform ease-out duration-500`}
				style={{ transform: `translateX(${sidebarTranslate})` }}
			>
				<nav className="h-full flex flex-col justify-between gap-5 relative">
					<button
						className="absolute top-6 right-3 md:hidden"
						onClick={() => setSidebarTranslate('-100%')}
					>
						<AiOutlineClose className="text-2xl m-3 border-zinc-200" />
					</button>
					<div>
						<Image
							src={white_text_logo}
							alt="text instagram logo"
							width={160}
							className="ml-2"
						/>
						<div className="flex flex-col px-3 gap-4">
							<Link href="/" className="nav-action">
								<AiFillHome className="text-2xl" />
								Inicio
							</Link>
							<Link href="/search" className="nav-action">
								<AiOutlineSearch className="text-2xl" />
								Búsqueda
							</Link>
							{user && (
								<>
									<div className="nav-action">
										<AiFillHeart className="text-2xl" />
										Likes
									</div>
									<Link href="/create" className="nav-action">
										<BsFillImageFill className="text-2xl" />
										Crear{' '}
									</Link>
								</>
							)}
						</div>
					</div>
					{user && (
						<div className="px-6 flex items-center py-12 justify-between border-t border-zinc-800">
							<div className="flex items-center gap-3">
								<Link href={`/user/${user.id}`}>
									<Image
										src={
											user.avatar ??
											'https://ucarecdn.com/ff33b248-1904-4f99-bfc3-02ad9f7d5fd5/'
										}
										alt="user avatar"
										width={50}
										height={50}
										className="rounded-full outline outline-2 outline-zinc-700 overflow-hidden cursor-pointer"
									/>
								</Link>
								<div>
									<p className="hover:text-white w-28 overflow-hidden text-ellipsis">
										<Link href={`/user/${user.id}`}>{user.user_name}</Link>
									</p>
									<button className="text-zinc-400 text-sm hover:underline hover:text-zinc-200">
										editar perfil
									</button>
								</div>
							</div>
							<button
								onClick={logout}
								className="hover:bg-white/10 transition-colors ease-out rounded-md"
								title="Cerrar sesión"
							>
								<BiLogOut className="text-3xl m-1" />
							</button>
						</div>
					)}
				</nav>
			</div>
		</>
	)
}
export default dynamic(() => Promise.resolve(Sidebar), { ssr: false })
