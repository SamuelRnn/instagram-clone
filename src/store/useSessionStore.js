import { MdSignalCellularNull } from 'react-icons/md'
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useSessionStore = create(
	persist(
		(set, get) => ({
			user: null,
			setUser: userData => set({ user: userData }),
			clearUser: () => set({ user: null }),
		}),
		{
			name: 'user-storage',
			onRehydrateStorage: () => state => {
				state.setHasHydrated(true)
			},
		}
	)
)
