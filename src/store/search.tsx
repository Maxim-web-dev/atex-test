import { create } from 'zustand'

type Store = {
  search: string
  setSearch: (search: string) => void
}

const useSearchStore = create<Store>()((set) => ({
  search: '',
  setSearch: (search) => set({ search }),
}))

export default useSearchStore