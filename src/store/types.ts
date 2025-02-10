export interface esimProvider {
	id: number
	country: string
	search: string
	operators: operator[]
	flag: string
}
export interface operator {
	operator: string
	url: string
	logo: string
	tarifs: tarif[]
}
export interface tarif {
	price: string
	internet: string
	call: string
	sms: string
}