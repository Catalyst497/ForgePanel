import { create } from 'zustand'
import { Door } from '../Types'

type Store = {
  activePosition: number | null | string ,
  doorPositions: [string, string],
  materials: string[],
  activeModel: string | null,
  doors:Door[],
  setActiveModel: (pos: string | null) => void,
  setActivePosition: (pos: number | null | string) => void,
  setDoors: (pos: Door[]) => void,
}

export const useAppStore = create<Store>((set) => ({
  activePosition: null,
  doorPositions: ["Exterior", "Interior"],
  materials: ["glass", "composite", "fiberglass", "wood", "metal", "painted", "primed", "pvc"],
  activeModel: null,
  doors: [],
  setActiveModel: (pos) => set({activeModel: pos}),
  setActivePosition: (pos) => set({ activePosition: pos }),
  setDoors: (pos) => set({ doors: pos })
}))