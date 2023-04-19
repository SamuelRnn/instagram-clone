import '@/styles/globals.css'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function App({ Component, pageProps }) {
	const [loader, setLoader] = useState(true)

	useEffect(() => {
		setTimeout(() => {
			setLoader(false)
			document.body.style.overflow = 'auto'
		}, 1500)
	}, [])
	return (
		<>
			<Head>
				<title>Instagram Clone</title>
				<link rel="icon" type="image/jpg" href="/assets/logo.svg" />
			</Head>
			<Component {...pageProps} />
			{loader && (
				<div className="fixed top-0 left-0 w-full h-screen bg-zinc-800 grid place-content-center">
					<Image
						src="/assets/logo.svg"
						alt="logo"
						width={200}
						height={200}
						className="custom-rotate"
					/>
				</div>
			)}
		</>
	)
}
