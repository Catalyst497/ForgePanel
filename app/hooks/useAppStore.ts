import { create } from 'zustand'

type Store = {
  activePosition: number | null | string ,
  doorPositions: [string, string],
  materials: string[],
  activeModel: string | null,
  setActiveModel: (pos: string | null) => void,
  setActivePosition: (pos: number | null | string) => void
}

export const useAppStore = create<Store>((set) => ({
  activePosition: null,
  doorPositions: ["Exterior", "Interior"],
  materials: ["glass", "composite", "fiberglass", "wood", "metal", "painted", "primed", "pvc"],
  activeModel: null,
  setActiveModel: (pos) => set({activeModel: pos}),
  setActivePosition: (pos) => set({ activePosition: pos }),
}))