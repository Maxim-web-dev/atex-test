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

const App = () => {
	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path='/' element={<Layout />}>
				<Route index element={<ListOfCountries />} />
				<Route path='/:id' element={<CountryPage />} />
				<Route path='/:id/pay' element={<Pay />} />
			</Route>
		)
	)
	return (
		<ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
			<RouterProvider router={router} />
			<Toaster />
		</ThemeProvider>
	)
}

export default App
