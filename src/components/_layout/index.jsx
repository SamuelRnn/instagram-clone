import Sidebar from './Sidebar'

export default function Layout({ children }) {
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-main-layout">
				<Sidebar />
				<main className="w-full min-h-screen">{children}</main>
			</div>
			<div></div>
		</>
	)
}
