import { Link } from 'react-router-dom'
import { Button } from '../components/ui/button'
import axios from 'axios'
import {
	Card,
	CardHeader,
	CardTitle,
} from '../components/ui/card'
import Search from '../components/search'
import { useEffect, useState } from 'react'
import useSearchStore from '../store/search'
import { esimProvider } from '../store/types'

const ListOfCountries = () => {
	const [data, setData] = useState<esimProvider[]>([])
	const { search } = useSearchStore()

	useEffect(() => {
		axios
			.get('https://66f4456877b5e8897098fcda.mockapi.io/api')
			.then(res => setData(res.data))
			.catch(err => console.log(err))
	}, [])

	return (
		<div className='w-full flex flex-col justify-center items-center gap-5'>
			<Search />
			<div className='w-full flex flex-col items-center gap-3'>
				{data
					?.filter(item => item.search.includes(search.toLowerCase()))
					.map(item => (
						<Card className='w-full' key={item.id}>
							<CardHeader className='p-4'>
								<CardTitle className='flex justify-between items-center'>
									<div className='flex items-center'>
										<div className='mr-2 text-4xl'><img src={item.flag} className='w-6'/></div>
										<div className='text-sm'>{item.country}</div>
									</div>
									<Button>
										<Link to={`/${item.id}`}>Купить</Link>
									</Button>
								</CardTitle>
							</CardHeader>
						</Card>
					))}
			</div>
		</div>
	)
}

export default ListOfCountries
