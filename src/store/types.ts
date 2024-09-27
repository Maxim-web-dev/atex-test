export interface esimProvider {
	id: number
	country: string
	search: string
	operators: operator[]
	flag: string
}
export interface operator {
	name: string
	url: string
	logo: string
}