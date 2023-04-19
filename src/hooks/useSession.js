const { useSessionStore } = require('@/store')

export const useSession = () => {
	const sessionData = useSessionStore(state => ({
		setUser: state.setUser,
		user: state.user,
	}))
	return { ...sessionData }
}
