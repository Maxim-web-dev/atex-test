// Импортируем необходимые библиотеки и файлы
import axios from 'axios' // Библиотека для выполнения HTTP-запросов
import { useEffect, useState } from 'react' // Хуки React для управления состоянием и жизненным циклом компонента
import { useNavigate, useParams } from 'react-router-dom' // Хуки для навигации и получения параметров маршрута
import { Button } from '../components/ui/button' // Компонент кнопки из локального файла
import { Card, CardFooter, CardHeader, CardTitle } from '../components/ui/card' // Компоненты карточки из другого файла проекта
import { esimProvider } from '../store/types' // Типы данных для провайдеров eSIM
import { useTelegram } from '../hooks/useTelegram' // Кастомный хук для работы с Telegram Mini Apps

// Компонент (можно использовать многократно в разных местах)
const CountryPage = () => {
	const { tg, BackButton } = useTelegram() // Получаем объект Telegram и кнопку "Назад" из кастомного хука
	const navigate = useNavigate() // Хук для навигации между страницами
	const [data, setData] = useState<esimProvider>() // Состояние для хранения данных о провайдере eSIM
	const { id } = useParams() // Получаем параметр из ссылки страницы (id страны)

	useEffect(() => {
		BackButton.show() // Показываем кнопку "Назад" в интерфейсе Telegram

		// Добавляем обработчик события для кнопки "Назад"
		tg.onEvent('backButtonClicked', () => {
			tg.BackButton.hide() // Скрываем кнопку "Назад"
			window.history.back() // Возвращаемся на предыдущую страницу в истории браузера
			navigate('/') // Перенаправляем пользователя на главную страницу
		})

		// Если параметр id существует, выполняем запрос на сервер для получения данных
		if (id) {
			axios
				.get(`https://66f4456877b5e8897098fcda.mockapi.io/api/${id}`) // Выполняем GET-запрос
				.then(res => {
					setData(res.data)
					console.log(res.data)
				}) // Устанавливаем полученные данные в состояние
				.catch(err => console.log(err)) // Обрабатываем ошибку, если запрос не удался
		}

		// Очистка при размонтировании компонента
		return () => {
			tg.BackButton.hide() // Скрываем кнопку "Назад"
			tg.offEvent('backButtonClicked') // Удаляем обработчик события для кнопки "Назад"
		}
	}, []) // Пустой массив зависимостей означает, что эффект выполнится только при монтировании и размонтировании компонента

	// Отрисовываем компонент
	return (
		<div className='w-full flex flex-col justify-center'>
			<div className='w-350px'>
				<div className='flex flex-col space-y-1.5 p-6'>
					<div className='flex gap-3 items-center text-2xl font-semibold leading-none tracking-tight'>
						<img src={data?.flag} className='w-8' />{' '}
						{/* Отображаем флаг страны */}
						{`${data?.country}`} {/* Отображаем название страны */}
					</div>
					<div className='text-sm text-muted-foreground'>
						Выберите оператора {/* Подсказка для пользователя */}
					</div>
				</div>
				<div className='flex flex-col gap-4'>
					{/* Отображаем список операторов */}
					{data?.operators.map((operator, operatorId) => (
						<Card className='flex' key={operatorId}>
							<div className=''>
								<CardHeader>
									<CardTitle className='flex'>
										<img
											src={operator.logo}
											alt=''
											className='w-10 h-10 flex justify-center items-center'
										/>{' '}
										{/* Логотип оператора */}
										{operator.operator} {/* Название оператора */}
									</CardTitle>
								</CardHeader>
								<CardFooter>
									<Button>
										<a href={operator.url}>Купить</a>
									</Button>{' '}
									{/* Кнопка для перехода на страницу покупки */}
								</CardFooter>
							</div>
							<div className='m-6'>
								<p className='text-muted-foreground'>Тарифы:</p>
								<div className='flex flex-col justify-start'>
									{data?.operators[operatorId]?.tarifs?.map((_, id) => (
										<div className='flex items-center gap-1' key={id}>
											<span className='flex h-1 w-1  rounded-full bg-sky-500' />
											<p className='text-xs my-1'>
												{data?.operators[operatorId]?.tarifs[id]?.internet} /{' '}
												{data?.operators[operatorId]?.tarifs[id]?.call} /{' '}
												{data?.operators[operatorId]?.tarifs[id]?.sms} sms /{' '}
												{data?.operators[operatorId]?.tarifs[id]?.price}
											</p>
										</div>
									))}
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</div>
	)
}

export default CountryPage // Экспортируем компонент для использования в других частях приложения
