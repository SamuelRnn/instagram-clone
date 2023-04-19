import Sidebar from './Sidebar'
import RegisterBanner from './RegisterBanner'
import { useSessionStore } from '@/store'

export default function Layout({ children }) {
	const user = useSessionStore(state => state.user)

	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-main-layout">
				<Sidebar user={user} />
				<main className="w-full min-h-screen">{children}</main>
			</div>
			{!user && <RegisterBanner />}
		</>
	)
}
