/* eslint-disable no-mixed-spaces-and-tabs */
import { Review } from '@/util/interfaces/interfaces'
import { Dispatch, Fragment, SetStateAction, useState } from 'react'
import countries from '@/util/countries/countries.json'
import provinces from '@/util/countries/canada/provinces.json'
import regions from '@/util/countries/unitedKingdom/regions.json'
import states from '@/util/countries/unitedStates/states.json'
import territories from '@/util/countries/australia/territories.json'
import counties from '@/util/countries/ireland/counties.json'
import { country_codes } from '@/util/helpers/getCountryCodes'
import { Dialog, Transition } from '@headlessui/react'
import { useAppDispatch } from '@/redux/hooks'
import { updateAlertOpen, updateAlertSuccess } from '@/redux/alert/alertSlice'

interface IProps {
	selectedReview: Review | undefined
	handleMutate: () => void
	setEditReviewOpen: Dispatch<SetStateAction<boolean>>
	editReviewOpen: boolean
	setSelectedReview: Dispatch<SetStateAction<Review | undefined>>
}

const EditReviewModal = ({
	selectedReview,
	handleMutate,
	setEditReviewOpen,
	editReviewOpen,
	setSelectedReview,
}: IProps) => {
	const dispatch = useAppDispatch()
	const [landlord, setLandlord] = useState<string>(
		selectedReview?.landlord || '',
	)
	const [country, setCountry] = useState<string>(
		selectedReview?.country_code || '',
	)
	const [city, setCity] = useState<string>(selectedReview?.city || '')
	const [province, setProvince] = useState<string>(selectedReview?.state || '')
	const [postal, setPostal] = useState<string>(selectedReview?.zip || '')
	const [review, setReview] = useState<string>(selectedReview?.review || '')
	const [rent, setRent] = useState<number | null>(selectedReview?.rent || null)
	const [moderationReason, setModerationReason] = useState<string | null>(
		selectedReview?.moderation_reason || null,
	)
	const isIreland = country === 'IE'

	const onSubmitEditReview = () => {
		const editedReview = {
			...selectedReview,
			landlord: landlord,
			country: country,
			city: city,
			state: province,
			zip: postal,
			review: review,
			admin_edited: true,
			admin_approved: true,
			flagged: false,
			rent: rent,
			moderation_reason: moderationReason,
		}
		fetch('/api/review/edit-review', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(editedReview),
		})
			.then((result) => {
				if (!result.ok) {
					throw new Error()
				}
			})
			.then(() => {
				handleMutate()
				setEditReviewOpen(false)
				dispatch(updateAlertSuccess(true))
				dispatch(updateAlertOpen(true))
				setSelectedReview(undefined)
			})
			.catch((err) => {
				console.log(err)
				dispatch(updateAlertSuccess(false))
				dispatch(updateAlertOpen(true))
				setSelectedReview(undefined)
			})
	}
	return (
		<Transition.Root show={editReviewOpen} as={Fragment}>
			<Dialog as='div' className='relative z-10' onClose={setEditReviewOpen}>
				<Transition.Child
					as={Fragment}
					enter='ease-out duration-300'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='ease-in duration-200'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
				</Transition.Child>

				<div className='fixed inset-0 z-50 overflow-y-auto'>
					<div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
						<Transition.Child
							as={Fragment}
							enter='ease-out duration-300'
							enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
							enterTo='opacity-100 translate-y-0 sm:scale-100'
							leave='ease-in duration-200'
							leaveFrom='opacity-100 translate-y-0 sm:scale-100'
							leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
						>
							<Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
								<div className='mt-1'>
									<div className='sm:col-span-3'>
										<label
											htmlFor='landlord'
											className='block text-sm  text-gray-700'
										>
											Landlord
										</label>
										<div className='mt-1'>
											<input
												type='text'
												name='landlord'
												id='landlord'
												required
												placeholder='Landlord'
												value={landlord ? landlord : selectedReview?.landlord}
												onChange={(e) => setLandlord(e.target.value)}
												className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												data-testid='create-review-form-landlord-1'
											/>
										</div>
									</div>
									<div className='sm:col-span-3'>
										<label
											htmlFor='country'
											className='block text-sm  text-gray-700'
										>
											Country
										</label>
										<div className='mt-1'>
											<select
												id='country'
												name='country'
												required
												value={country ? country : selectedReview?.country_code}
												onChange={(e) => setCountry(e.target.value)}
												className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											>
												{country_codes.map((country) => {
													return (
														<option key={country} value={country}>
															{countries[country]}
														</option>
													)
												})}
											</select>
										</div>
									</div>
									<div className='sm:col-span-2'>
										<label
											htmlFor='city'
											className='block text-sm  text-gray-700'
										>
											City
										</label>
										<div className='mt-1'>
											<input
												type='text'
												name='city'
												id='city'
												placeholder='city'
												value={city ? city : selectedReview?.city}
												required
												onChange={(e) => setCity(e.target.value)}
												className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												data-testid='create-review-form-city-1'
											/>
										</div>
									</div>
									<div className='sm:col-span-2'>
										<label
											htmlFor='region'
											className='block text-sm  text-gray-700'
										>
											Province / State
										</label>
										<div className='mt-1'>
											<select
												id='region'
												name='region'
												required
												value={province ? province : selectedReview?.state}
												onChange={(e) => setProvince(e.target.value)}
												className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											>
												<option>{province}</option>
												{country === 'CA'
													? provinces.map((province) => {
															return (
																<option
																	key={province.short}
																	value={province.name}
																>
																	{province.name}
																</option>
															)
													  })
													: country === 'GB'
													? regions.map((region) => {
															return (
																<option key={region.short} value={region.name}>
																	{region.name}
																</option>
															)
													  })
													: country === 'AU'
													? territories.map((territory) => {
															return (
																<option
																	key={territory.short}
																	value={territory.name}
																>
																	{territory.name}
																</option>
															)
													  })
													: country === 'IE'
													? counties.map((county) => {
															return (
																<option key={county.short} value={county.name}>
																	{county.name}
																</option>
															)
													  })
													: states.map((state) => {
															return (
																<option key={state.short} value={state.name}>
																	{state.name}
																</option>
															)
													  })}
											</select>
										</div>
									</div>
									{isIreland ? null : (
										<div className='sm:col-span-2'>
											<label
												htmlFor='postal-code'
												className='block text-sm  text-gray-700'
											>
												Postal Code / ZIP
											</label>
											<div className='mt-1'>
												<input
													type='text'
													name='postal-code'
													id='postal-code'
													placeholder='Postal Code / ZIP'
													required
													value={postal ? postal : selectedReview?.zip}
													onChange={(e) => setPostal(e.target.value)}
													className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
													data-testid='create-review-form-postal-code-1'
												/>
											</div>
										</div>
									)}
									<div className='sm:col-span-2'>
										<label
											htmlFor='rent'
											className='block text-sm  text-gray-700'
										>
											Rent
										</label>
										<div className='mt-1'>
											<input
												type='number'
												name='rent'
												id='rent'
												placeholder='Rent'
												required
												value={rent ? rent : selectedReview?.rent || ''}
												onChange={(e) => setRent(Number(e.target.value))}
												className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												data-testid='create-review-form-rent-1'
											/>
										</div>
									</div>
									<div className='sm:col-span-2'>
										<label
											htmlFor='review'
											className='block text-sm  text-gray-700'
										>
											Review
										</label>
										<textarea
											rows={4}
											name='review'
											id='review'
											className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
											onChange={(e) => setReview(e.target.value)}
											value={review ? review : selectedReview?.review}
											data-testid='edit-review-modal-1'
										/>
									</div>
									<div className='sm:col-span-2'>
										<label
											htmlFor='moderation-reason'
											className='block text-sm  text-gray-700'
										>
											Moderation Reason
										</label>
										<div className='mt-1'>
											<input
												type='text'
												name='moderation-reason'
												id='moderation-reason'
												placeholder='Moderation Reason'
												required
												value={moderationReason ? moderationReason : ''}
												onChange={(e) => setModerationReason(e.target.value)}
												className='block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm'
												data-testid='create-review-form-moderation-reason-1'
											/>
										</div>
									</div>
								</div>
								<div className='mt-5 sm:mt-4 sm:flex sm:flex-row-reverse'>
									<button
										type='button'
										className={`inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base  text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm`}
										onClick={() => onSubmitEditReview()}
									>
										Submit
									</button>
									<button
										type='button'
										className='mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base  text-gray-700 shadow-sm hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:w-auto sm:text-sm'
										onClick={() => {
											setSelectedReview(undefined)
											setEditReviewOpen(false)
										}}
									>
										Cancel
									</button>
								</div>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition.Root>
	)
}

export default EditReviewModal
