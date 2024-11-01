import {
	Route,
	RouterProvider,
	createBrowserRouter,
	createRoutesFromElements,
} from 'react-router-dom'
import ListOfCountries from './pages/ListOfCountries'
import { ThemeProvider } from './components/theme-provider'
import Layout from './pages/Layout'
import CountryPage from './pages/CountryPage'
import Pay from './pages/Pay'
import { Toaster } from './components/ui/toaster'
import { useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram'

const App = () => {
	const { tg } = useTelegram()

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Layout />}>
				<Route index element={<ListOfCountries />} />
				<Route path='/:id' element={<CountryPage />} />
				<Route path='/:id/pay' element={<Pay />} />
			</Route>
		)
	)	
	useEffect(() => {
		tg.ready()
		tg.expand()
		tg.BackButton.onClick = () => {
			window.location.href = 'https://atex-test.vercel.app/'
		}
	}, [])
	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<RouterProvider router={router} />
			<Toaster />
		</ThemeProvider>
	)
}

export default App
