import { create } from 'zustand'

type Store = {
  activePosition: number | null
  doorPositions: [string, string],
  setActivePosition: (pos: number | null) => void
  
}

export const useAppStore = create<Store>((set) => ({
  activePosition: null,
  doorPositions: ["Exterior", "Interior"],
  setActivePosition: (pos) => set({ activePosition: pos }),
}))