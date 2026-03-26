function Values() {
	return (
		<section className="relative overflow-hidden bg-[#f5f5f5] py-20 sm:py-24 lg:py-28">
			<div className="absolute inset-x-0 top-0 z-0">
				<div className="h-8 sm:h-10 bg-[#ebe4cb]" />
				<svg
					viewBox="0 0 1440 80"
					preserveAspectRatio="none"
					className="-mt-px h-6 sm:h-8 w-full text-[#ebe4cb]"
					fill="none"
				>
					<path
						d="M0,22 C220,58 440,0 720,22 C1000,44 1220,8 1440,30 L1440,0 L0,0 Z"
						fill="currentColor"
					/>
				</svg>
			</div>

			<div className="relative z-10 mx-auto w-full max-w-6xl px-4 sm:px-8 lg:px-14 text-center">
				<h2 className="font-serif text-[#202163] text-4xl sm:text-5xl lg:text-6xl leading-tight">
					Our Core Values
				</h2>

				<div className="mt-8 sm:mt-10 rounded-4xl border border-[#B38E34]/55 bg-transparent px-5 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-14">
					<p className="mx-auto max-w-4xl text-[#262626] text-[1.15rem] sm:text-[1.35rem] lg:text-[1.55rem] leading-[1.55] sm:leading-[1.6] font-normal">
						At Grace Arena Ministries, we are one big family — connected by{' '}
						<span className="text-[#B38E34]">Love</span>,{' '}
						<span className="text-[#B38E34]">Word</span>,{' '}
						<span className="text-[#B38E34]">Prayer</span>,{' '}
						<span className="text-[#B38E34]">Service</span>,{' '}
						<span className="text-[#B38E34]">Excellence</span>, and{' '}
						<span className="text-[#B38E34]">Discipleship</span>.
					</p>
				</div>
			</div>

			<div className="absolute inset-x-0 bottom-0 z-0">
				<svg
					viewBox="0 0 1440 80"
					preserveAspectRatio="none"
					className="-mb-px h-7 sm:h-9 w-full text-[#ebe4cb]"
					fill="none"
				>
					<path
						d="M0,52 C260,24 480,72 720,52 C960,32 1180,64 1440,40 L1440,80 L0,80 Z"
						fill="currentColor"
					/>
				</svg>
				<div className="h-8 sm:h-10 bg-[#ebe4cb]" />
			</div>
		</section>
	);
}

export default Values;
