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

interface data {
	id: number
	name: string
	search: string
	price: string
	flag: string
}
const ListOfCountries = () => {
	const [data, setData] = useState<data[]>([])
	const { search } = useSearchStore()

	useEffect(() => {
		axios
			.get('https://65a02bdf7310aa1f8144b77c.mockapi.io/api')
			.then(res => setData(res.data))
			.catch(err => console.log(err))
	}, [])

	return (
		<div className='w-full flex flex-col justify-center items-center gap-5'>
			<h1 className='text-3xl'>Atex</h1>
			<Search />
			<div className='w-full flex flex-col items-center gap-3'>
				{data
					?.filter(item => item.search.includes(search.toLowerCase()))
					.map(item => (
						<Card className='w-full' key={item.id}>
							<CardHeader className='p-4'>
								<CardTitle className='flex justify-between items-center'>
									<div className='flex items-center'>
										<div className='mr-2 text-4xl'>{item.flag}</div>
										<div className='text-sm'>{item.name}</div>
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
