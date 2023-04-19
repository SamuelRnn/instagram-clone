import { Layout, HomePostCard } from '@/components/'

export default function Home() {
	return (
		<Layout>
			<div className="w-full pt-12">
				<div className="min-h-screen w-box mx-auto">
					<HomePostCard />
					<HomePostCard />
					<HomePostCard />
				</div>
			</div>
		</Layout>
	)
}
