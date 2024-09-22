import { Outlet } from 'react-router-dom'

const Layout = () => {
	return (
		<div className='w-[100vw] h-[100vh] bg-background py-10 px-8'>
			<Outlet />
		</div>
	)
}

export default Layout
