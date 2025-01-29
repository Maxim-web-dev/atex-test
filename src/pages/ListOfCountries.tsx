// Импорт необходимых компонентов и библиотек
import { Link } from 'react-router-dom' // Компонент для создания ссылок в React Router
import { Button } from '../components/ui/button' // Кастомный компонент кнопки
import axios from 'axios' // Библиотека для выполнения HTTP-запросов
import { Card, CardHeader, CardTitle } from '../components/ui/card' // Компоненты для создания карточек
import Search from '../components/search' // Компонент поиска
import { useEffect, useState } from 'react' // Хуки для управления состоянием и жизненным циклом компонента
import useSearchStore from '../store/search' // Кастомный хук для управления состоянием поиска
import { esimProvider } from '../store/types' // Тип данных для провайдеров eSIM

// Основной компонент ListOfCountries
const ListOfCountries = () => {
	// Состояние для хранения данных о странах и провайдерах eSIM
	const [data, setData] = useState<esimProvider[]>([])

	// Получение текущего значения поиска из хранилища
	const { search } = useSearchStore()

	// Эффект для загрузки данных при монтировании компонента
	useEffect(() => {
		axios
			.get('https://66f4456877b5e8897098fcda.mockapi.io/api') // Запрос данных с API
			.then(res => setData(res.data)) // Установка данных в состояние
			.catch(err => console.log(err)) // Обработка ошибок
	}, []) // Пустой массив зависимостей означает, что эффект выполнится только один раз

	// Рендер компонента
	return (
		<div className='w-full flex flex-col justify-center items-center gap-5'>
			{/* Компонент поиска */}
			<Search />

			{/* Контейнер для отображения списка стран */}
			<div className='w-full flex flex-col items-center gap-3'>
				{/* Фильтрация данных по значению поиска и отображение карточек */}
				{data
					?.filter(item => item.search.includes(search.toLowerCase())) // Фильтрация данных
					.map(item => (
						// Карточка для каждой страны
						<Card className='w-full' key={item.id}>
							<CardHeader className='p-4'>
								<CardTitle className='flex justify-between items-center'>
									{/* Блок с флагом и названием страны */}
									<div className='flex items-center'>
										<div className='mr-2 text-4xl'>
											<img
												src={item.flag}
												className='w-6'
												alt={`Флаг ${item.country}`}
											/>
										</div>
										<div className='text-sm'>{item.country}</div>
									</div>

									{/* Кнопка для перехода на страницу покупки */}
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

// Экспорт компонента по умолчанию
export default ListOfCountries
