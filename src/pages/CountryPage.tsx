import { Link, useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../components/ui/card'
import { Label } from '../components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '../components/ui/select'
import axios from 'axios'
import { useEffect, useState } from 'react'
import PayWidget from '../components/pay-widget'

interface data {
	id: number
	name: string
	search: string
	price: string
	flag: string
}

const CountryPage = () => {
	const [data, setData] = useState<data>()
	const { id } = useParams()

	const [select, setSelect] = useState('')
	console.log(select)

	const onChange = (value: string) => setSelect(value)

	useEffect(() => {
		if (id) {
			axios
				.get(`https://65a02bdf7310aa1f8144b77c.mockapi.io/api/${id}`)
				.then(res => setData(res.data))
				.catch(err => console.log(err))
		}
	}, [])

	return (
		<div className='w-full flex flex-col justify-center items-center'>
			<h1 className='text-3xl mb-5'>Atex</h1>
			<Card className='w-[350px]'>
				<CardHeader>
					<CardTitle>
						{data?.flag} {` ${data?.name}`}
					</CardTitle>
					<CardDescription>
						Выберите тариф и нажмите "Оплатить"{' '}
					</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-4'>
					<form>
						<div className='grid w-full items-center gap-4'>
							<div className='flex flex-col space-y-1.5'>
								<Label htmlFor='framework'>Тариф</Label>
								<Select onValueChange={onChange}>
									<SelectTrigger id='framework'>
										<SelectValue placeholder='Select' />
									</SelectTrigger>
									<SelectContent position='popper'>
										<SelectItem value='10'>10$ / 1 Гб</SelectItem>
										<SelectItem value='20'>20$ / 3 Гб</SelectItem>
										<SelectItem value='30'>30$ / 5 Гб</SelectItem>
									</SelectContent>
								</Select>
							</div>
						</div>
					</form>
					<CardDescription>
						eSIM будет доступна 30 дней с момента покупки. В стоимость также
						входит 300 минут для звонков
					</CardDescription>
					<PayWidget amount={select} />
				</CardContent>
				<CardFooter>
					<Button variant='outline'>
						<Link to={`/`}>Выйти</Link>
					</Button>
				</CardFooter>
			</Card>
		</div>
	)
}

export default CountryPage
