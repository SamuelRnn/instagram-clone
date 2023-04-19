import { useSession } from '@/hooks/useSession'
import Sidebar from './Sidebar'
import RegisterBanner from './RegisterBanner'

export default function Layout({ children }) {
	const session = useSession()
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-main-layout">
				<Sidebar />
				<main className="w-full min-h-screen">{children}</main>
			</div>
			{session.user && <RegisterBanner />}
		</>
	)
}
