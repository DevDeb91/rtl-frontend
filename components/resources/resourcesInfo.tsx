import { useTranslation } from 'react-i18next'

const ResourcesInfo = () => {
	const { t } = useTranslation('resourcesPage')
	const info: Array<string> = t('resources.info', {
		returnObjects: true,
	})
	return (
		<div data-testid='about-Resources-1' className='w-full bg-white'>
			<div className='mx-auto max-w-7xl px-6 text-lg lg:px-8'>
				<h1>
					<span className='mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
						{t('resources.title')}
					</span>
				</h1>
				<p className='mt-8 text-center text-xl font-bold leading-8 text-gray-500'>
					{t('resources.description')}
				</p>
				{info.map((item, i) => {
					return (
						<p key={i} className='mt-8 text-xl leading-8 text-gray-500'>
							{item}
						</p>
					)
				})}
			</div>
		</div>
	)
}

export default ResourcesInfo
