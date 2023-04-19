import { AiFillHeart } from 'react-icons/ai'
import { RiSendPlaneFill } from 'react-icons/ri'
import { MdInsertComment } from 'react-icons/md'
import Image from 'next/image'

export default function HomePostCard() {
	return (
		<div className="w-full flex flex-col">
			<div className="flex items-center py-4 gap-3 text-sm">
				<Image
					src="https://ucarecdn.com/ff33b248-1904-4f99-bfc3-02ad9f7d5fd5/"
					alt="profile name"
					width={40}
					height={40}
					className="rounded-full outline outline-2 outline-zinc-700 text-xs overflow-hidden grid place-content-center"
				/>
				<p>Usuario_de_instaclone</p>
			</div>
			<div className="bg-main-black-accent border border-zinc-700 aspect-square rounded-md"></div>
			<div className="py-3 text-2xl flex justify-between">
				<div className="flex gap-3">
					<div className="flex gap-1">
						<button>
							<AiFillHeart className="post-actions" />
						</button>
						<span className="text-sm select-none">134</span>
					</div>
					<div className="flex gap-1">
						<button>
							<MdInsertComment className="post-actions" />
						</button>
						<span className="text-sm select-none">23</span>
					</div>
				</div>
				<RiSendPlaneFill className="post-actions" />
			</div>
			<p className="text-zinc-400 text-sm">
				<span className="text-zinc-200 font-bold">
					<button>Usuario_de_instaclone</button>
				</span>{' '}
				Lorem ipsum, dolor sit amet consectetur adipisicing elit. Expedita
				corrupti ipsam nisi sapiente libero odit quo quaerat praesentium,
				quibusdam neque quisquam...{' '}
				<span>
					<button className="hover:underline text-zinc-300">Leer más</button>
				</span>
			</p>
			<hr className="border-zinc-700 my-4" />
		</div>
	)
}
