import { BookOpen, Globe2, HandHeart, Handshake } from 'lucide-react';

const roadmapItems = [
	{
		id: 1,
		title: 'CONNECT',
		description: 'With God through worship, prayer, and fellowship.',
		icon: Handshake,
		desktopPosition: 'lg:left-[3%] lg:top-[57%]'
	},
	{
		id: 2,
		title: 'GROW',
		description: 'In the knowledge of God’s Word.',
		icon: BookOpen,
		desktopPosition: 'lg:left-[30%] lg:top-[15%]'
	},
	{
		id: 3,
		title: 'SERVE',
		description: 'With our lives, families, and resources.',
		icon: HandHeart,
		desktopPosition: 'lg:left-[55%] lg:top-[34%]'
	},
	{
		id: 4,
		title: 'EXPAND',
		description: 'To the unreached in the nations of the world.',
		icon: Globe2,
		desktopPosition: 'lg:left-[84%] lg:top-[11%]'
	}
];

function Roadmap() {
	return (
		<section className="bg-[#efefef] py-12 sm:py-14 lg:py-16 lg:pb-28">
			<div className="mx-auto w-full max-w-295 px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="font-serif text-4xl sm:text-5xl leading-none text-[#202163]">GAM Roadmap</h2>
					<p className="mt-2 text-lg sm:text-xl text-[#6c6c6c]">Connect • Grow • Serve • Expand</p>
				</div>

				<div className="relative mt-7 rounded-2xl bg-[#f7f7f7] px-4 py-7 sm:px-7 sm:py-8 lg:h-160 lg:px-8 lg:py-8">
					<svg
						viewBox="0 0 1200 320"
						preserveAspectRatio="none"
						className="pointer-events-none absolute inset-x-3 bottom-4 hidden h-62.5 lg:block"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M20 270 C 180 210, 260 120, 390 120 C 520 120, 560 210, 690 210 C 820 210, 880 90, 1060 190 C 1120 220, 1160 220, 1180 210"
							stroke="#d0d0d0"
							strokeWidth="15"
							strokeLinecap="round"
							opacity="0.85"
						/>
						<path
							d="M20 270 C 180 210, 260 120, 390 120 C 520 120, 560 210, 690 210 C 820 210, 880 90, 1060 190 C 1120 220, 1160 220, 1180 210"
							stroke="#B38E34"
							strokeWidth="5"
							strokeLinecap="round"
							opacity="0.78"
						/>
					</svg>

					<div className="grid gap-6 sm:grid-cols-2 lg:block">
						{roadmapItems.map((item) => {
							const Icon = item.icon;

							return (
								<article
									key={item.id}
									className={`relative rounded-2xl border border-[#e8e8e8] bg-white p-5 shadow-[0_2px_8px_rgba(0,0,0,0.06)] lg:absolute lg:w-62.5 ${item.desktopPosition}`}
								>
									<div className="absolute -top-6 left-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#b89a4f] bg-[#B38E34] text-xl font-semibold text-[#f8f2dd] shadow-[0_2px_8px_rgba(0,0,0,0.18)]">
										{item.id}
									</div>

									<div className="pt-5">
										<h3 className="flex items-center gap-2 text-[2rem] font-semibold leading-tight text-[#202163] lg:text-[2.1rem]">
											<Icon className="h-5 w-5 text-[#B38E34]" strokeWidth={2.4} />
											<span>{item.title}</span>
										</h3>
										<p className="mt-2 text-[1.9rem] leading-snug text-[#212121]">{item.description}</p>
									</div>
								</article>
							);
						})}
					</div>
				</div>
			</div>
		</section>
	);
}

export default Roadmap;
