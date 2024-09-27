import axios from 'axios'
import { useEffect, useState } from 'react'
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
import { esimProvider } from '../store/types'

const CountryPage = () => {
	const [data, setData] = useState<esimProvider>()
	const { id } = useParams()

	useEffect(() => {
		if (id) {
			axios
				.get(`https://66f4456877b5e8897098fcda.mockapi.io/api/${id}`)
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
						{data?.flag} {` ${data?.country}`}
					</CardTitle>
					<CardDescription>Выберите оператора</CardDescription>
				</CardHeader>
				<CardContent className='flex flex-col gap-4'>
					{data?.operators.map(operator => (
						<Card>
							<CardHeader>
								<CardTitle className='flex'> 
									<img src={operator.logo} alt="" className='w-10 h-10'/>
									{operator.name}</CardTitle>
							</CardHeader>
							<CardFooter>
								<Button><a href={operator.url}>Купить</a></Button>
							</CardFooter>
						</Card>
					))}
					<CardDescription>
						eSIM будет доступна 30 дней с момента покупки. В стоимость также
						входит 300 минут для звонков
					</CardDescription>
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
