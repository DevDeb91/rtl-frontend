import LinkButtonLG from '@/components/ui/link-button-lg'

export default function Custom404() {
	return (
		<main className='mt-2 grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
			<div className='text-center'>
				<p className='text-base  text-indigo-600'>404</p>
				<h1 className='mt-4 text-3xl   text-gray-900 sm:text-5xl'>
					Page not found
				</h1>
				<p className='mt-6 text-base leading-7 text-gray-600'>
					Sorry, we couldn&apos;t find the page you’re looking for.
				</p>
				<div className='mt-10 flex items-center justify-center gap-x-6'>
					<LinkButtonLG href='/'>Go back home</LinkButtonLG>
				</div>
			</div>
		</main>
	)
}
