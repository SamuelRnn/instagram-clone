import '@/styles/globals.css'
import { useSessionStore } from '@/store'
import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'

export default function App({ Component, pageProps }) {
	const [loader, setLoader] = useState(true)
	const setUser = useSessionStore(state => state.setUser)

	useEffect(() => {
		const getSession = async () => {
			try {
				const { data } = await axios.post('/api/users/verify-session')
				setUser(data.user)
			} catch (error) {}

			setTimeout(() => {
				setLoader(false)
				document.body.style.overflow = 'auto'
			}, 1500)
		}
		getSession()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])
	return (
		<>
			<Head>
				<title>Instagram Clone</title>
				<link rel="icon" type="image/jpg" href="/assets/logo.svg" />
			</Head>
			<Component {...pageProps} />
			{loader && (
				<div className="fixed z-[999] top-0 left-0 w-full h-screen bg-zinc-800 grid place-content-center">
					<Image
						src="/assets/logo.svg"
						alt="logo"
						width={200}
						height={200}
						className="custom-rotate"
					/>
				</div>
			)}
			<Toaster
				position="bottom-center"
				reverseOrder={false}
				toastOptions={{
					style: {
						borderRadius: '10px',
						background: '#333',
						color: '#fff',
					},
				}}
			/>
		</>
	)
}
