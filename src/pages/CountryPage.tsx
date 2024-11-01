import axios from 'axios'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../components/ui/button'
import {
	Card,

	CardFooter,
	CardHeader,
	CardTitle,
} from '../components/ui/card'
import { esimProvider } from '../store/types'
import { useTelegram } from '../hooks/useTelegram'

const CountryPage = () => {
	const { BackButton } = useTelegram()
	const [data, setData] = useState<esimProvider>()
	const { id } = useParams()

	useEffect(() => {
		BackButton.show()

		if (id) {
			axios
				.get(`https://66f4456877b5e8897098fcda.mockapi.io/api/${id}`)
				.then(res => setData(res.data))
				.catch(err => console.log(err))
		}
	}, [])
	
	return (
		<div className='w-full flex flex-col justify-center'>
			<div className="w-350px">
				<div className="flex flex-col space-y-1.5 p-6">
					<div className="text-2xl font-semibold leading-none tracking-tight">
						{data?.flag} {` ${data?.country}`}
					</div>
					<div className="text-sm text-muted-foreground">
						Выберите оператора
					</div>
					</div>
				<div className="flex flex-col gap-4">
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
				</div>
			</div>
		</div>
	)
}

export default CountryPage
