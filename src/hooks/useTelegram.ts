export const useTelegram = () => {
	// @ts-ignore
	const tg = window.Telegram.WebApp
	tg.BackButton.onClick = () => window.history.back()
	return {
		tg,
		ready: () => tg.ready(),
		BackButton: {
			show: () => tg.BackButton.show(),
			hide: () => tg.BackButton.hide(),
		},
	}
}