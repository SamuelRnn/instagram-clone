import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export const useSessionStore = create(
	persist(
		(set, get) => ({
			user: null,
			setUser: userData => set({ user: userData }),
			clearUser: () => set({ user: null }),
		}),
		{ name: 'user' }
	)
)
