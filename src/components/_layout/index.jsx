import Sidebar from './Sidebar'
import RegisterBanner from './RegisterBanner'
import { useSessionStore } from '@/store'
import PostModal from '../PostModal'
import { useState } from 'react'

export default function Layout({ children }) {
	const user = useSessionStore(state => state.user)
	const [createModalIsOpen, setCreateModalIsOpen] = useState(false)
	const openCreateModal = () => setCreateModalIsOpen(true)
	const closeCreateModal = () => setCreateModalIsOpen(false)
	return (
		<>
			<div className="grid grid-cols-1 md:grid-cols-main-layout">
				<Sidebar user={user} openCreateModal={openCreateModal} />
				<main className="w-full min-h-screen pb-32 pt-16 md:pt-20">
					{children}
				</main>
			</div>
			{!user && <RegisterBanner />}
			{createModalIsOpen && <PostModal closeCreateModal={closeCreateModal} />}
		</>
	)
}
