import { useNavigate } from 'react-router-dom'

export const useTelegram = () => {
	// @ts-ignore
	const tg = window.Telegram.WebApp
	tg.BackButton.onClick = () => {
		window.location.href = 'https://atex-test.vercel.app/'
	}
	return {
		tg,
		ready: () => tg.ready(),
		BackButton: {
			show: () => tg.BackButton.show(),
			hide: () => tg.BackButton.hide(),
			onClick: () => {
				const navigate = useNavigate()
				navigate('/')
			},
		},
	}
}