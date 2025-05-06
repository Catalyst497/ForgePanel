import { create } from 'zustand'

type Store = {
  activePosition: number | null
  setActivePosition: (pos: number | null) => void
}

export const useStore = create<Store>((set) => ({
  activePosition: null,
  setActivePosition: (pos) => set({ activePosition: pos }),
}))