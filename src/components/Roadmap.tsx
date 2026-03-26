import { BookOpen, Globe2, HandHeart, Handshake } from 'lucide-react';

const roadmapItems = [
	{
		id: 1,
		title: 'CONNECT',
		description: 'With God through worship, prayer, and fellowship.',
		icon: Handshake,
		desktopPosition: 'lg:left-[3.5%] lg:top-[56%]',
	},
	{
		id: 2,
		title: 'GROW',
		description: 'In the knowledge of God’s Word.',
		icon: BookOpen,
		desktopPosition: 'lg:left-[26.5%] lg:top-[16%]',
	},
	{
		id: 3,
		title: 'SERVE',
		description: 'With our lives, families, and resources.',
		icon: HandHeart,
		desktopPosition: 'lg:left-[52.5%] lg:top-[35%]',
	},
	{
		id: 4,
		title: 'EXPAND',
		description: 'To the unreached in the nations of the world.',
		icon: Globe2,
		desktopPosition: 'lg:left-[79%] lg:top-[14%]',
	},
];

function Roadmap() {
	return (
		<section id="gam-roadmap" className="bg-[#efefef] py-12 sm:py-14 lg:py-16">
			<div className="mx-auto w-full max-w-280 px-4 sm:px-6 lg:px-8">
				<div className="text-center">
					<h2 className="text-[36px] font-semibold leading-none tracking-[-0.02em] text-[#1f2167] sm:text-[40px]">
						GAM Roadmap
					</h2>
					<p className="mt-1 text-[20px] leading-none text-[#666666]">Connect • Grow • Serve • Expand</p>
				</div>

				<div className="relative mt-6 rounded-2xl bg-[#f6f6f6] p-4 sm:p-6 lg:h-85 lg:p-0">
					<svg
						viewBox="0 0 1200 300"
						preserveAspectRatio="none"
						className="pointer-events-none absolute bottom-4.5 left-4 right-4 hidden h-62.5 lg:block"
						fill="none"
						aria-hidden="true"
					>
						<path
							d="M18 258 C 140 214, 235 106, 365 108 C 502 110, 558 206, 694 206 C 842 206, 904 98, 1026 170 C 1098 214, 1144 220, 1182 208"
							stroke="#d4d4d4"
							strokeWidth="11"
							strokeLinecap="round"
							opacity="0.9"
						/>
						<path
							d="M18 258 C 140 214, 235 106, 365 108 C 502 110, 558 206, 694 206 C 842 206, 904 98, 1026 170 C 1098 214, 1144 220, 1182 208"
							stroke="#B38E34"
							strokeWidth="2.75"
							strokeLinecap="round"
							opacity="0.85"
						/>
					</svg>

					<div className="grid gap-6 sm:grid-cols-2 lg:block">
						{roadmapItems.map((item) => {
							const Icon = item.icon;

							return (
								<article
									key={item.id}
									className={`relative rounded-2xl border border-[#ececec] bg-[#f8f8f8] px-5 pb-4 pt-5 shadow-[0_2px_8px_rgba(0,0,0,0.07)] lg:absolute lg:w-56.75 ${item.desktopPosition}`}
								>
									<div className="absolute -top-6 left-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#b9953b] bg-[#c2a347] text-[15px] font-semibold text-[#fff8de] shadow-[0_2px_7px_rgba(0,0,0,0.2)]">
										{item.id}
									</div>

									<div className="pt-3">
										<h3 className="flex items-center gap-1.5 text-[1.45rem] font-semibold leading-[1.05] tracking-[-0.02em] text-[#1f2167] sm:text-[1.6rem]">
											<Icon className="h-4 w-4 text-[#c2a347]" strokeWidth={2.4} />
											<span>{item.title}</span>
										</h3>
										<p className="mt-1.5 text-[1.03rem] leading-[1.45] text-[#232323]">
											{item.description}
										</p>
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
