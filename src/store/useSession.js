import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSession = create(
	persist(
		(set, get) => ({
			user: null,
			setUser: userData => set({ user: userData }),
		}),
		{ name: 'user' }
	)
)
