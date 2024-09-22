import { ChangeEvent, useState } from 'react'
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import useSearchStore from '../store/search'

const Search = () => {
	const [searchValue, setSearchValue] = useState('')
  const { setSearch } = useSearchStore()

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value)
    setSearch(e.target.value)
  }
  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="email">Поиск</Label>
      <Input placeholder="Введите страну" onChange={handleChange} value={searchValue}/>
    </div>
  )
}

export default Search